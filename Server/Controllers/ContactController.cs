using FreelanceAPI.Data;
using FreelanceApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace FreelanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public ContactController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactMessageDto dto)
        {
            var contact = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Message = dto.Message
            };

            _context.ContactMessages.Add(contact);
            await _context.SaveChangesAsync();

            // שליחת אימייל
            var fromEmail = _config["EmailSettings:From"];
            var fromPassword = _config["EmailSettings:Password"];

            var client = new SmtpClient("smtp.gmail.com", 587)
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

            return Ok(new { message = "Message received and email sent!" });
        }
    }
}
