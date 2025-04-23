using FreelanceAPI.Data;
using FreelanceApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace FreelanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<ContactController> _logger;

        public ContactController(AppDbContext context, IConfiguration config, ILogger<ContactController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactMessageDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Message))
            {
                _logger.LogWarning("Invalid contact message submitted.");
                return BadRequest("Name, email, and message are required.");
            }

            var contact = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Message = dto.Message
            };

            try
            {
                _context.ContactMessages.Add(contact);
                await _context.SaveChangesAsync();

                var fromEmail = _config["EmailSettings:From"];
                var fromPassword = _config["EmailSettings:Password"];

                using var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential(fromEmail, fromPassword),
                    EnableSsl = true
                };

                var mail = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = "We received your message",
                    Body = $"Hello {dto.Name},\n\nThank you for contacting us. We will get back to you soon!\n\n- Freelance4U Team",
                    IsBodyHtml = false
                };

                mail.To.Add(dto.Email);

                await client.SendMailAsync(mail);

                _logger.LogInformation("Contact message from {Email} saved and confirmation email sent.", dto.Email);
                return Ok(new { message = "Message received and email sent!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to process contact message from {Email}", dto.Email);
                return StatusCode(500, "Something went wrong while processing your request.");
            }
        }
    }
}
