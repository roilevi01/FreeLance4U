using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FreelanceAPI.Data;
using FreelanceAPI.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace FreelanceAPI.Controllers
{
    [Route("api/businesscards")]
    [ApiController]
    public class BusinessCardController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BusinessCardController> _logger;

        public BusinessCardController(AppDbContext context, ILogger<BusinessCardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("create")]
        [Authorize]
        public IActionResult CreateBusinessCard([FromBody] BusinessCard businessCard)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                _logger.LogWarning("Unauthorized attempt to create business card.");
                return Unauthorized("User is not authenticated.");
            }

            businessCard.Id = Guid.NewGuid();
            businessCard.UserId = Guid.Parse(userId);

            _context.BusinessCards.Add(businessCard);
            _context.SaveChanges();

            _logger.LogInformation("Business card {CardId} created by user {UserId}.", businessCard.Id, userId);
            return Ok(new { message = "Business card created successfully", businessCard });
        }

        [HttpGet("all")]
        public IActionResult GetAllBusinessCards()
        {
            var businessCards = _context.BusinessCards.ToList();
            _logger.LogInformation("Retrieved {Count} business cards.", businessCards.Count);
            return Ok(businessCards);
        }

        [HttpGet("{id}")]
        public IActionResult GetBusinessCardById(Guid id)
        {
            var card = _context.BusinessCards.FirstOrDefault(c => c.Id == id);
            if (card == null)
            {
                _logger.LogWarning("Card with ID {CardId} not found.", id);
                return NotFound("Card not found");
            }

            _logger.LogInformation("Card {CardId} retrieved successfully.", id);
            return Ok(card);
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult UpdateBusinessCard(Guid id, [FromBody] BusinessCard updatedCard)
        {
            if (updatedCard == null)
            {
                _logger.LogWarning("Update failed: No data provided.");
                return BadRequest("Invalid request data.");
            }

            var card = _context.BusinessCards.FirstOrDefault(c => c.Id == id);
            if (card == null)
            {
                _logger.LogWarning("Card {CardId} not found for update.", id);
                return NotFound("Business card not found.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != card.UserId.ToString() && userRole != "Admin")
            {
                _logger.LogWarning("Unauthorized update attempt by user {UserId} on card {CardId}", userId, id);
                return Forbid("You do not have permission to modify this business card.");
            }

            
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

            _logger.LogInformation("Card {CardId} updated by user {UserId}", id, userId);
            return Ok(new { message = "Business card updated successfully", card });
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteBusinessCard(Guid id)
        {
            var businessCard = _context.BusinessCards.Find(id);
            if (businessCard == null)
            {
                _logger.LogWarning("Attempt to delete non-existing card {CardId}.", id);
                return NotFound("Business card not found.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != businessCard.UserId.ToString() && userRole != "Admin")
            {
                _logger.LogWarning("Unauthorized delete attempt by user {UserId} on card {CardId}", userId, id);
                return Forbid("You do not have permission to delete this business card.");
            }

            _context.BusinessCards.Remove(businessCard);
            _context.SaveChanges();

            _logger.LogInformation("Card {CardId} deleted by user {UserId}", id, userId);
            return Ok(new { message = "Business card deleted successfully" });
        }
    }
}
