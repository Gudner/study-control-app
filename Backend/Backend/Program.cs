using Backend.Configuration;
using Backend.Database;
using Backend.Database.Migrations;
using Backend.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using System.Reflection;

namespace Backend;

public class Program
{
    public static async Task Main(string[] args)
    {
        Log.Logger = CreateLogger();

        var host = Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .UseConsoleLifetime()
            .Build();

        Application.Configuration = host.Services.GetRequiredService<IConfiguration>();

        Application.PrimaryDbConnectionProvider = (configuration) => configuration.GetConnectionStringForStudyControlDb();

        try
        {
            Log.Information("Starting generic host");

            DbUpdater.EnsureDatabaseSchemaUpToDate(new Assembly[] { typeof(SubjectCard).Assembly, typeof(Program).Assembly });

            await host.RunAsync();
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Host terminated unexpectedly");
        }
        finally
        {
            Log.CloseAndFlush();
        }
    }

    private static ILogger CreateLogger() => new LoggerConfiguration()
                   .MinimumLevel.Debug()
                   .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                   .Enrich.FromLogContext()
                   .WriteTo.Console()
                   .WriteTo.File(Path.Combine("logs", "log.txt"), rollingInterval: RollingInterval.Day)
                   .CreateLogger();
}

