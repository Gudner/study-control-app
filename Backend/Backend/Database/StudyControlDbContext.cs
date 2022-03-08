using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public class StudyControlDbContext : DbContext
{
    public StudyControlDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
    }
}
