using Backend.Configuration;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Initialization;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Backend.Database.Migrations;

public static class DbUpdater
{
    public static void EnsureDatabaseSchemaUpToDate(Assembly[] assembliesToScanIn, string[] tagsToInclude = null)
    {
        var serviceProvider = CreateServices(assembliesToScanIn, tagsToInclude);

        using (var scope = serviceProvider.CreateScope())
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }
    }

    private static IServiceProvider CreateServices(Assembly[] assembliesToScanIn, string[] tagsToInclude)
    {
        return new ServiceCollection()
            .AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSqlServer2016()
                .WithGlobalConnectionString(Application.PrimaryDbConnectionString)
                .WithGlobalCommandTimeout(TimeSpan.FromMinutes(5))
                .ScanIn(assembliesToScanIn).For.Migrations())
            .AddLogging(lb => lb.AddFluentMigratorConsole())
            .Configure<RunnerOptions>(opt => { opt.Tags = tagsToInclude; })
            .BuildServiceProvider(false);
    }
}
