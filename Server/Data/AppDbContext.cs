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
        // Data/AppDbContext.cs
        public DbSet<ContactMessage> ContactMessages { get; set; }


        // ✅ הוספת טבלת כרטיסי הביקור
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // קשר בין BusinessCards ל-User (נשאר Cascade)
            modelBuilder.Entity<BusinessCard>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // קשר בין Comments ל-User - נשתמש ב-NoAction כדי למנוע multiple cascade paths
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

            // גם ל-Like אם יש קשר דומה
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
