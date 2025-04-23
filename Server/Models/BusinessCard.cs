using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreelanceAPI.Models
{
    public class BusinessCard
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; } 

        [Required, MaxLength(100)]
        public string BusinessName { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string ContactInfo { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? BusinessImage { get; set; } 

        [Required, MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty; 

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
