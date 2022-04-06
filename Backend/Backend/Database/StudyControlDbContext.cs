using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public class StudyControlDbContext : DbContext
{
    public DbSet<SubjectCard> SubjectCards { get; set; }
    public DbSet<Control> Controls { get; set; }
    public DbSet<ControlTask> ControlTasks { get; set; }

    public StudyControlDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<Control>()
            .HasOne(x => x.SubjectCard)
            .WithMany(x => x.Controls)
            .HasForeignKey(x => x.SubjectCardId);

        modelBuilder.Entity<ControlTask>()
            .HasOne(x => x.Control)
            .WithMany(x => x.ControlTasks)
            .HasForeignKey(x => x.ControlId);
    }
}
