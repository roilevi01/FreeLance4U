using Microsoft.EntityFrameworkCore;
using FreelanceAPI.Models;
using FreelanceApi.Models;

namespace FreelanceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<BusinessCard> BusinessCards { get; set; }
        public DbSet<Like> Likes { get; set; } 
        public DbSet<Comment> Comments { get; set; }
        
        public DbSet<ContactMessage> ContactMessages { get; set; }


        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<BusinessCard>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.BusinessCard)
                .WithMany()
                .HasForeignKey(c => c.BusinessCardId)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany()
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.BusinessCard)
                .WithMany()
                .HasForeignKey(l => l.BusinessCardId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
