using Backend.Configuration;
using Backend.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public static class DatabaseManager
{
    public static StudyControlDbContext CreateStudyAppDbContext(bool disableTracking = false)
    {
        var optionsBuilder = new DbContextOptionsBuilder<StudyControlDbContext>();
        optionsBuilder.UseSqlServer(Application.Configuration.GetConnectionStringForStudyControlDb());
        if (disableTracking)
        {
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        return new StudyControlDbContext(optionsBuilder.Options);
    }
}
