using FluentMigrator;

namespace Backend.Database.Migrations;

[Migration(202203081259)]
public class SubjectCardTable : Migration
{
    public override void Down() {}

    public override void Up()
    {
        Create.Table(nameof(SubjectCard))
            .WithColumn(nameof(SubjectCard.SubjectCardId)).AsInt32().PrimaryKey().Identity()
            .WithColumn(nameof(SubjectCard.SubjectName)).AsString().NotNullable()
            .WithColumn(nameof(SubjectCard.TeacherName)).AsString().NotNullable();
    }
}
