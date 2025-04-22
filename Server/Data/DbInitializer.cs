using FreelanceAPI.Data;
using FreelanceAPI.Models;
using FreelanceAPI.Services;

namespace FreelanceApi.Data
{
    public static class DbInitializer
    {
        public static void SeedUsers(AppDbContext context)
        {
            var adminExists = context.Users.Any(u => u.Email == "admin@freelance.com");
            var userExists = context.Users.Any(u => u.Email == "user@freelance.com");

            if (!adminExists)
            {
                var admin = new User
                {
                    Id = Guid.NewGuid(),
                    Username = "Admin User",
                    Email = "admin@freelance.com",
                    Role = "Admin",
                    PasswordHash = AuthService.HashPassword("Admin123!")
                };
                context.Users.Add(admin);
            }

            if (!userExists)
            {
                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Username = "Regular User",
                    Email = "user@freelance.com",
                    Role = "User",
                    PasswordHash = AuthService.HashPassword("User123!")
                };
                context.Users.Add(user);
            }

            context.SaveChanges();
        }

    }
}
