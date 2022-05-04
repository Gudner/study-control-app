using Backend.Database;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.EndpointDefinitions;

public class SubjectCardEndpointDefinition : IEndpointDefinition
{
    private WebApplication app;

    public void DefineEndpoints(WebApplication app)
    {
        this.app = app;
        this.app.MapGet("api/subjectcards/{id}", 
            async (int id, StudyControlDbContext dbContext) => await GetItem(dbContext, id)).RequireCors("allowAny");
        this.app.MapGet("api/subjectcards",
            async (StudyControlDbContext dbContext) => Results.Json(await GetAllItems(dbContext), new JsonSerializerOptions(JsonSerializerDefaults.Web) { ReferenceHandler = ReferenceHandler.IgnoreCycles })).RequireCors("allowAny");
        this.app.MapPut("api/subjectcards", async (SubjectCardRequestBody body, StudyControlDbContext dbContext) => await AddNewItem(body, dbContext)).RequireCors("allowAny");
        this.app.MapDelete("api/subjectcards/{id}", async (int id, StudyControlDbContext dbContext) =>
        {
            var subjectCard = await dbContext.SubjectCards.SingleOrDefaultAsync(x => x.SubjectCardId == id);

            if(subjectCard is null)
            {
                return Results.NotFound();
            }

            dbContext.SubjectCards.Remove(subjectCard);
            await dbContext.SaveChangesAsync();

            return Results.Ok();
        }).RequireCors("allowAny");
    }

    public void DefineServices(IServiceCollection services) {}

    private async Task<IResult> GetItem(StudyControlDbContext dbContext, int subjectCardId)
    {
        var subjectCard = await dbContext.SubjectCards
            .Include(x => x.Controls)
            .ThenInclude(x => x.ControlTasks)
            .SingleOrDefaultAsync(x => x.SubjectCardId == subjectCardId);

        if(subjectCard is null)
        {
            return Results.NotFound();
        }

        return Results.Json(subjectCard, new JsonSerializerOptions(JsonSerializerDefaults.Web) { ReferenceHandler = ReferenceHandler.IgnoreCycles });
    }

    private async Task<List<SubjectCard>> GetAllItems(StudyControlDbContext dbContext)
    {
        return await dbContext.SubjectCards
            .Include(x => x.Controls)
            .ThenInclude(x => x.ControlTasks)
            .ToListAsync();
    }

    private async Task<IResult> AddNewItem(SubjectCardRequestBody body, StudyControlDbContext dbContext)
    {
        var subjectCard = new SubjectCard()
        {
            SubjectName = body.SubjectName,
            TeacherName = body.TeacherName,
        };

        await dbContext.AddAsync(subjectCard);
        await dbContext.SaveChangesAsync();

        return Results.Json(subjectCard);
    }
}
