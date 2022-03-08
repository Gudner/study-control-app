using Backend.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data.Common;

namespace Backend.Configuration;

public static class Application
{
    public static IConfiguration Configuration { get; set; }
    public static Func<IConfiguration, string> PrimaryDbConnectionProvider { get; set; }
    public static string PrimaryDbConnectionString => PrimaryDbConnectionProvider.Invoke(Configuration);

    public static Func<DbConnection> ConnectToStudyAppDatabase = () => new SqlConnection(Configuration.GetConnectionStringForStudyControlDb());
}
