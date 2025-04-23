using FreelanceAPI.Data;
using FreelanceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FreelanceAPI.Controllers
{
    [Route("api/likes")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<LikeController> _logger;

        public LikeController(AppDbContext context, ILogger<LikeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("{cardId}")]
        [Authorize]
        public IActionResult Like(Guid cardId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _logger.LogWarning("Unauthorized like attempt.");
                return Unauthorized();
            }

            if (!_context.BusinessCards.Any(b => b.Id == cardId))
            {
                return NotFound("Card not found.");
            }

            var alreadyLiked = _context.Likes.Any(l =>
                l.UserId == Guid.Parse(userId) && l.BusinessCardId == cardId);

            if (alreadyLiked)
            {
                return BadRequest("You already liked this card.");
            }

            var like = new Like
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userId),
                BusinessCardId = cardId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Likes.Add(like);
            _context.SaveChanges();

            _logger.LogInformation("User {UserId} liked card {CardId}.", userId, cardId);
            return Ok(new { message = "Card liked successfully." });
        }

        [HttpDelete("{cardId}")]
        [Authorize]
        public IActionResult Unlike(Guid cardId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _logger.LogWarning("Unauthorized unlike attempt.");
                return Unauthorized();
            }

            var like = _context.Likes
                .FirstOrDefault(l => l.UserId == Guid.Parse(userId) && l.BusinessCardId == cardId);

            if (like == null)
            {
                return NotFound("Like not found.");
            }

            _context.Likes.Remove(like);
            _context.SaveChanges();

            _logger.LogInformation("User {UserId} unliked card {CardId}.", userId, cardId);
            return Ok(new { message = "Like removed successfully." });
        }

        [HttpGet("count/{cardId}")]
        public IActionResult GetLikesCount(Guid cardId)
        {
            var count = _context.Likes.Count(l => l.BusinessCardId == cardId);
            return Ok(new { likes = count });
        }

        [HttpGet("has-liked/{cardId}")]
        [Authorize]
        public IActionResult HasUserLiked(Guid cardId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            bool liked = _context.Likes.Any(l =>
                l.UserId == Guid.Parse(userId) && l.BusinessCardId == cardId);

            return Ok(new { liked });
        }
    }
}
