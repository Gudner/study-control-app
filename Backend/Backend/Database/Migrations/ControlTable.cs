using FluentMigrator;
using System.Data;

namespace Backend.Database.Migrations;

[Migration(202203081435)]
public class ControlTable : Migration
{
    public override void Down() {}

    public override void Up()
    {
        Create.Table(nameof(Control))
            .WithColumn(nameof(Control.ControlId)).AsInt32().PrimaryKey().Identity()
            .WithColumn(nameof(Control.ControlType)).AsString(128).NotNullable()
            .WithColumn(nameof(Control.DeadlineDate)).AsDateTime().NotNullable()
            .WithColumn(nameof(Control.SubjectCardId)).AsInt32()
                .ForeignKey(nameof(SubjectCard), nameof(SubjectCard.SubjectCardId)).OnDelete(Rule.Cascade)
                    .Indexed();
    }
}
