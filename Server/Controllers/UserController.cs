using FreelanceAPI.Data;
using FreelanceAPI.Models;
using FreelanceAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FreelanceAPI.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        private readonly ILogger<UserController> _logger;

        public UserController(AppDbContext context, AuthService authService, ILogger<UserController> logger)
        {
            _context = context;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                _logger.LogWarning("Attempted registration with existing email: {Email}", user.Email);
                return BadRequest(new { message = "Email already exists" });
            }

            user.PasswordHash = AuthService.HashPassword(user.PasswordHash);
            user.Role = string.IsNullOrEmpty(user.Role) ? "User" : user.Role;
            user.ProfilePicture = user.ProfilePicture ?? string.Empty;

            _context.Users.Add(user);
            _context.SaveChanges();

            _logger.LogInformation("New user registered: {Email}", user.Email);
            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginRequest.Email);
            if (user == null || !AuthService.VerifyPassword(loginRequest.Password, user.PasswordHash))
            {
                _logger.LogWarning("Failed login attempt for email: {Email}", loginRequest.Email);
                return Unauthorized("Invalid email or password");
            }

            user.LastLogin = DateTime.Now;
            _context.SaveChanges();

            var token = _authService.GenerateJwtToken(user.Id.ToString(), user.Role);
            _logger.LogInformation("User logged in: {Email}", user.Email);
            return Ok(new { token });
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateUser(Guid id, [FromBody] UpdateUserDto updatedUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                _logger.LogWarning("Attempt to update non-existent user with ID: {UserId}", id);
                return NotFound("User not found");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != user.Id.ToString() && userRole != "Admin")
            {
                _logger.LogWarning("Unauthorized update attempt by user {UserId}", userId);
                return Forbid("You do not have permission to modify this user.");
            }

            if (!string.IsNullOrWhiteSpace(updatedUserDto.Username))
                user.Username = updatedUserDto.Username;
            if (!string.IsNullOrWhiteSpace(updatedUserDto.Email))
                user.Email = updatedUserDto.Email;

            if (!string.IsNullOrWhiteSpace(updatedUserDto.CurrentPassword) &&
                !string.IsNullOrWhiteSpace(updatedUserDto.NewPassword) &&
                !string.IsNullOrWhiteSpace(updatedUserDto.ConfirmPassword))
            {
                if (!AuthService.VerifyPassword(updatedUserDto.CurrentPassword, user.PasswordHash))
                    return BadRequest("Current password is incorrect.");

                if (updatedUserDto.NewPassword != updatedUserDto.ConfirmPassword)
                    return BadRequest("New password and confirmation do not match.");

                user.PasswordHash = AuthService.HashPassword(updatedUserDto.NewPassword);
            }

            _context.Users.Update(user);
            _context.SaveChanges();

            _logger.LogInformation("User {UserId} updated their profile", user.Id);
            return Ok(new { message = "User updated successfully." });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                _logger.LogWarning("Admin attempted to delete non-existent user: {UserId}", id);
                return NotFound("User not found");
            }

            var loggedInUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (loggedInUserId == user.Id.ToString())
            {
                _logger.LogWarning("Admin tried to delete their own account");
                return BadRequest("Admin cannot delete their own account.");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            _logger.LogInformation("Admin deleted user {UserId}", user.Id);
            return Ok(new { message = "User deleted successfully" });
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.Role,
                    u.LastLogin
                })
                .ToListAsync();

            _logger.LogInformation("Admin fetched all users list.");
            return Ok(users);
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadProfileImage(IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                _logger.LogWarning("Upload failed: empty image.");
                return BadRequest("No image uploaded.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var imageUrl = $"{baseUrl}/uploads/{fileName}";

            _logger.LogInformation("Profile image uploaded: {ImageUrl}", imageUrl);
            return Ok(new { imageUrl });
        }

        [HttpGet("profile/{id}")]
        public IActionResult GetUserProfile(Guid id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                _logger.LogWarning("User profile not found for ID: {UserId}", id);
                return NotFound("User not found");
            }

            _logger.LogInformation("User profile fetched for ID: {UserId}", id);
            return Ok(new
            {
                user.Username,
                user.Email,
                user.ProfilePicture
            });
        }
    }
}
