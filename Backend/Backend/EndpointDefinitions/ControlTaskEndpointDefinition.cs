using Backend.Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.EndpointDefinitions;

public class ControlTaskEndpointDefinition : IEndpointDefinition
{
    private WebApplication app;

    public void DefineEndpoints(WebApplication app)
    {
        this.app = app;
        this.app.MapPut("api/controltasks", async (ControlTaskRequestBody body, StudyControlDbContext dbContext) =>
        {
            var control = await dbContext.Controls
            .Include(x => x.ControlTasks)
            .SingleOrDefaultAsync(x => x.ControlId == body.ControlId);

            if (control is null)
            {
                return Results.NotFound();
            }

            if(control.ControlTasks.Any(x => x.TaskText == body.TaskText))
            {
                return Results.BadRequest("Such a task already exists!");
            }

            var controlTask = new ControlTask()
            {
                ControlId = body.ControlId,
                TaskText = body.TaskText
            };

            dbContext.ControlTasks.Add(controlTask);
            dbContext.SaveChanges();

            return Results.Ok();
        }).RequireCors("allowAny");

        this.app.MapDelete("api/controltasks/{id}", async (int id, StudyControlDbContext dbContext) =>
        {
            var controlTask = await dbContext.ControlTasks.SingleOrDefaultAsync(x => x.ControlTaskId == id);

            if (controlTask is null)
            {
                return Results.NotFound();
            }

            dbContext.ControlTasks.Remove(controlTask);
            await dbContext.SaveChangesAsync();

            return Results.Ok();
        }).RequireCors("allowAny");
    }

    public void DefineServices(IServiceCollection services) {}
}
