using Microsoft.Extensions.Configuration;

namespace Backend.Extensions;

public static class IConfigurationExtensions
{
    public static string GetConnectionStringForStudyControlDb(this IConfiguration configuration) => configuration.GetConnectionString("StudyControlApp");
}
