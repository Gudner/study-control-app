using Backend.Database;
using EnumsNET;
using Microsoft.EntityFrameworkCore;

namespace Backend.EndpointDefinitions;

public class ControlEndpointDefinition : IEndpointDefinition
{
    private WebApplication app;

    public void DefineEndpoints(WebApplication app)
    {
        this.app = app;
        this.app.MapPut("api/controls", async (ControlRequestBody body, StudyControlDbContext dbContext) =>
        {
            var subjectCard = await dbContext.SubjectCards
            .Include(x => x.Controls)
            .SingleOrDefaultAsync(x => x.SubjectCardId == body.SubjectCardId);

            if(subjectCard is null)
            {
                return Results.NotFound();
            }

            var controlType = Enums.Parse<ControlType>(body.ControlType);

            if(subjectCard.Controls.Any(x => x.ControlType == controlType))
            {
                return Results.BadRequest($"A control with controlType: {controlType} already exists!");
            }

            var control = new Control()
            {
                ControlType = controlType,
                DeadlineDate = body.DeadlineDate,
                SubjectCardId = subjectCard.SubjectCardId,
            };

            dbContext.Controls.Add(control);
            dbContext.SaveChanges();

            return Results.Json(control);
        }).RequireCors("allowAny");
    }

    public void DefineServices(IServiceCollection services) {}
}
