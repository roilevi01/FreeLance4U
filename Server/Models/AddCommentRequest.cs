using System.ComponentModel.DataAnnotations;

namespace FreelanceAPI.Models
{
    public class AddCommentRequest
    {
        [Required]
        public Guid BusinessCardId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }
    }
}
