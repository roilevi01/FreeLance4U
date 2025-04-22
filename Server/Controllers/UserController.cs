using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FreelanceAPI.Data;
using FreelanceAPI.Models;
using FreelanceAPI.Services;
using System.Linq;
using System.Security.Claims;
using FreelanceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FreelanceAPI.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public UserController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // ✅ רישום משתמש חדש - פתוח לכולם
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            user.PasswordHash = AuthService.HashPassword(user.PasswordHash);
            user.Role = string.IsNullOrEmpty(user.Role) ? "User" : user.Role;
            user.ProfilePicture = user.ProfilePicture ?? string.Empty;

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User registered successfully" });
        }

        // ✅ התחברות משתמש - פתוח לכולם
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginRequest.Email);
            if (user == null || !AuthService.VerifyPassword(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            // ✅ עדכון זמן התחברות אחרון
            user.LastLogin = DateTime.Now;
            _context.SaveChanges();

            var token = _authService.GenerateJwtToken(user.Id.ToString(), user.Role);
            return Ok(new { token });
        }


        // ✅ עדכון פרטי משתמש - כל משתמש יכול לעדכן את עצמו בלבד, מנהל יכול לעדכן כל משתמש
        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult UpdateUser(Guid id, [FromBody] UpdateUserDto updatedUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != user.Id.ToString() && userRole != "Admin")
            {
                return Forbid("You do not have permission to modify this user.");
            }

            // עדכון שם משתמש ואימייל
            if (!string.IsNullOrWhiteSpace(updatedUserDto.Username))
                user.Username = updatedUserDto.Username;
            if (!string.IsNullOrWhiteSpace(updatedUserDto.Email))
                user.Email = updatedUserDto.Email;

            // שינוי סיסמה
            if (!string.IsNullOrWhiteSpace(updatedUserDto.CurrentPassword) &&
                !string.IsNullOrWhiteSpace(updatedUserDto.NewPassword) &&
                !string.IsNullOrWhiteSpace(updatedUserDto.ConfirmPassword))
            {
                if (!AuthService.VerifyPassword(updatedUserDto.CurrentPassword, user.PasswordHash))
                {
                    return BadRequest("Current password is incorrect.");
                }

                if (updatedUserDto.NewPassword != updatedUserDto.ConfirmPassword)
                {
                    return BadRequest("New password and confirmation do not match.");
                }

                user.PasswordHash = AuthService.HashPassword(updatedUserDto.NewPassword);
            }

            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok(new { message = "User updated successfully." });
        }

        // ✅ מחיקת משתמש - רק המנהל יכול למחוק משתמשים, לא את עצמו
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var loggedInUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (loggedInUserId == user.Id.ToString())
            {
                return BadRequest("Admin cannot delete their own account.");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
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

            return Ok(users);
        }




        [HttpPost("upload-image")]
        [Authorize]
        public async Task<IActionResult> UploadProfileImage(IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("No image uploaded.");

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

            return Ok(new { imageUrl });
        }

        // ✅ קבלת פרטי משתמש לפי ID
        [HttpGet("profile/{id}")]
        [Authorize]
        public IActionResult GetUserProfile(Guid id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.Username,
                user.Email,
                user.ProfilePicture
            });
        }


    }
}
