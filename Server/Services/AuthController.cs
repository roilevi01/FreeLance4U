using FreelanceAPI.Data;
using FreelanceAPI.Models;
using FreelanceAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using FreelanceApi.Models;

namespace FreelanceApi.Services
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppDbContext context, AuthService authService, ILogger<AuthController> logger)
        {
            _context = context;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("google")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenRequest request)
        {
            var idToken = request.IdToken;

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
                if (payload == null)
                    return Unauthorized("Invalid Google token.");

                var user = _context.Users.FirstOrDefault(u => u.Email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        Username = payload.Name,
                        Email = payload.Email,
                        Role = "User",
                        ProfilePicture = payload.Picture ?? ""
                    };
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                user.LastLogin = DateTime.Now;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                var token = _authService.GenerateJwtToken(user.Id.ToString(), user.Role);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Google login failed");
                return BadRequest("Google authentication failed.");
            }
        }
    }
}
