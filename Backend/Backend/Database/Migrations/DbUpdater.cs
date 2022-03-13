using FluentMigrator.Runner;
using System.Reflection;

namespace Backend.Database.Migrations;

public static class DbUpdater
{
    public static void EnsureDatabaseSchemaUpToDate(string connectionString)
    {
        var serviceProvider = CreateServices(connectionString);

        using var scope = serviceProvider.CreateScope();
        var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
        runner.MigrateUp();
    }

    private static IServiceProvider CreateServices(string connectionString)
    {
        return new ServiceCollection()
            .AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSqlServer2016()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(new Assembly[] { typeof(DbUpdater).Assembly }).For.Migrations())
            .AddLogging(lb => lb.AddFluentMigratorConsole())
            .BuildServiceProvider(false);
    }
}
