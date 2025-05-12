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

            _logger.LogInformation("Received Google IdToken: {IdToken}", idToken);

            if (string.IsNullOrWhiteSpace(idToken))
            {
                _logger.LogWarning("Empty or missing Google token.");
                return BadRequest("Missing Google token.");
            }

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

                if (payload == null)
                {
                    _logger.LogWarning("Google token validation failed: payload is null.");
                    return Unauthorized("Invalid Google token.");
                }

                var user = _context.Users.FirstOrDefault(u => u.Email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        Username = payload.Name,
                        Email = payload.Email,
                        Role = "User",
                        ProfilePicture = payload.Picture ?? "",
                        PasswordHash = "" 
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
            catch (InvalidJwtException jwtEx)
            {
                _logger.LogError(jwtEx, "JWT validation failed.");
                return Unauthorized("Invalid or expired Google token.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Google login failed due to an unexpected error.");
                return BadRequest("Google authentication failed.");
            }
        }
    }
}
