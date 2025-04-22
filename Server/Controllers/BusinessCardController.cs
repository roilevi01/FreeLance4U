using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FreelanceAPI.Data;
using FreelanceAPI.Models;
using System.Security.Claims;
using System.Data;

namespace FreelanceAPI.Controllers
{
    [Route("api/businesscards")]
    [ApiController]
    public class BusinessCardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BusinessCardController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ יצירת כרטיס ביקור - רק משתמשים רשומים יכולים
        [HttpPost("create")]
        [Authorize]
        public IActionResult CreateBusinessCard([FromBody] BusinessCard businessCard)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          
            if (userId == null)
            {
                return Unauthorized("User is not authenticated.");
            }

            businessCard.Id = Guid.NewGuid();
            businessCard.UserId = Guid.Parse(userId);

            _context.BusinessCards.Add(businessCard);
            _context.SaveChanges();

            return Ok(new { message = "Business card created successfully", businessCard });
        }

        // ✅ קבלת כל כרטיסי הביקור
        [HttpGet("all")]
        public IActionResult GetAllBusinessCards()
        {
            var businessCards = _context.BusinessCards.ToList();
            return Ok(businessCards);
        }

        // ✅ מחיקת כרטיס ביקור - רק יוצר הכרטיס או מנהל יכולים
        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteBusinessCard(Guid id)
        {
            var businessCard = _context.BusinessCards.Find(id);
            if (businessCard == null)
            {
                return NotFound("Business card not found.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // רק בעל הכרטיס או אדמין יכולים למחוק אותו
            if (userId != businessCard.UserId.ToString() && userRole != "Admin")
            {
                return Forbid("You do not have permission to delete this business card.");
            }

            _context.BusinessCards.Remove(businessCard);
            _context.SaveChanges();
            return Ok(new { message = "Business card deleted successfully" });
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult UpdateBusinessCard(Guid id, [FromBody] BusinessCard updatedCard)
        {
            if (updatedCard == null)
            {
                return BadRequest("Invalid request data.");
            }

            var card = _context.BusinessCards.FirstOrDefault(c => c.Id == id);
            if (card == null)
            {
                return NotFound("Business card not found.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // רק הבעלים של הכרטיס או אדמין יכולים לעדכן
            if (userId != card.UserId.ToString() && userRole != "Admin")
            {
                return Forbid("You do not have permission to modify this business card.");
            }

            // עדכון שדות רק אם סופקו ערכים חדשים
            if (!string.IsNullOrWhiteSpace(updatedCard.BusinessName))
                card.BusinessName = updatedCard.BusinessName;

            if (!string.IsNullOrWhiteSpace(updatedCard.Description))
                card.Description = updatedCard.Description;

            if (!string.IsNullOrWhiteSpace(updatedCard.ContactInfo))
                card.ContactInfo = updatedCard.ContactInfo;

            if (!string.IsNullOrWhiteSpace(updatedCard.PhoneNumber))
                card.PhoneNumber = updatedCard.PhoneNumber;

            if (!string.IsNullOrWhiteSpace(updatedCard.BusinessImage))
                card.BusinessImage = updatedCard.BusinessImage;

            _context.BusinessCards.Update(card);
            _context.SaveChanges();

            return Ok(new { message = "Business card updated successfully", card });
        }

        [HttpGet("{id}")]
        public IActionResult GetBusinessCardById(Guid id)
        {
            var card = _context.BusinessCards.FirstOrDefault(c => c.Id == id);
            if (card == null)
                return NotFound("Card not found");

            return Ok(card);
        }



    }

}
