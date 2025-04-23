using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FreelanceAPI.Data;

public class CleanupService : BackgroundService
{
    private readonly ILogger<CleanupService> _logger;
    private readonly IServiceProvider _serviceProvider;

    public CleanupService(ILogger<CleanupService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("✅ CleanupService started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    
                    var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);
                    var oldComments = dbContext.Comments.Where(c => c.CreatedAt < sixMonthsAgo);

                    if (await oldComments.AnyAsync())
                    {
                        dbContext.Comments.RemoveRange(oldComments);
                        await dbContext.SaveChangesAsync();
                        _logger.LogInformation("🧹 Deleted old comments successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error occurred in CleanupService.");
            }

            await Task.Delay(TimeSpan.FromHours(12), stoppingToken); 
        }
    }
}
