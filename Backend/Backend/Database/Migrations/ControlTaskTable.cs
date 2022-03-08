using FluentMigrator;
using System.Data;

namespace Backend.Database.Migrations;

[Migration(202203081501)]
public class ControlTaskTable : Migration
{
    public override void Down() {}

    public override void Up()
    {
        Create.Table(nameof(ControlTask))
            .WithColumn(nameof(ControlTask.ControlTaskId)).AsInt32().PrimaryKey().Identity()
            .WithColumn(nameof(ControlTask.TaskText)).AsString().NotNullable()
            .WithColumn(nameof(ControlTask.IsDone)).AsBoolean().NotNullable()
            .WithColumn(nameof(ControlTask.ControlId)).AsInt32()
                .ForeignKey(nameof(Control), nameof(Control.ControlId)).OnDelete(Rule.Cascade)
                    .Indexed();
    }
}
