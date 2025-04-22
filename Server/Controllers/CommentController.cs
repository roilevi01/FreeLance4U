using FreelanceAPI.Data;
using FreelanceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FreelanceAPI.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ יצירת תגובה על כרטיס
        [HttpPost("add")]
        [Authorize]
        public IActionResult AddComment([FromBody] AddCommentRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized("Not authenticated");

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

            return Ok(new { message = "Comment added successfully." });
        }


        // ✅ מחיקת תגובה ע"י בעל התגובה או אדמין
        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteComment(Guid id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null) return NotFound("Comment not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId != comment.UserId.ToString() && role != "Admin")
            {
                return Forbid("Not authorized to delete this comment.");
            }

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            return Ok(new { message = "Comment deleted successfully." });
        }

        // ✅ קבלת תגובות לפי כרטיס (כולל שם המשתמש)
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

            return Ok(comments);
        }
    }
}