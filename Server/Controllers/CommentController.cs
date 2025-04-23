using FreelanceAPI.Data;
using FreelanceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FreelanceAPI.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CommentController> _logger;

        public CommentController(AppDbContext context, ILogger<CommentController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("add")]
        [Authorize]
        public IActionResult AddComment([FromBody] AddCommentRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _logger.LogWarning("Attempt to add comment without authentication.");
                return Unauthorized("Not authenticated");
            }

            var comment = new Comment
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userId),
                BusinessCardId = request.BusinessCardId,
                Content = request.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            _context.SaveChanges();

            _logger.LogInformation("User {UserId} added a comment on card {CardId}", userId, request.BusinessCardId);

            return Ok(new { message = "Comment added successfully." });
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteComment(Guid id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null)
            {
                _logger.LogWarning("Attempt to delete non-existing comment {CommentId}", id);
                return NotFound("Comment not found");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != comment.UserId.ToString() && role != "Admin")
            {
                _logger.LogWarning("Unauthorized deletion attempt by user {UserId} on comment {CommentId}", userId, id);
                return Forbid("Not authorized to delete this comment.");
            }

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            _logger.LogInformation("Comment {CommentId} deleted by user {UserId}", id, userId);
            return Ok(new { message = "Comment deleted successfully." });
        }

        [HttpGet("by-card/{cardId}")]
        public IActionResult GetCommentsByCard(Guid cardId)
        {
            var comments = _context.Comments
                .Where(c => c.BusinessCardId == cardId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    c.CreatedAt,
                    Username = _context.Users.FirstOrDefault(u => u.Id == c.UserId).Username
                })
                .ToList();

            _logger.LogInformation("Fetched {Count} comments for card {CardId}", comments.Count, cardId);
            return Ok(comments);
        }
    }
}
