using Backend.Database;
using Backend.Database.Migrations;
using Backend.EndpointDefinitions;
using Backend.Extensions;
using Backend.Singletons;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("allowAny", o =>
{
    o.AllowAnyOrigin();
    o.AllowAnyHeader();
    o.AllowAnyMethod();
}));

builder.Services.AddEndpointDefinitions(typeof(SubjectCard));

builder.Services.AddDbContext<StudyControlDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionStringForStudyControlDb()));

var app = builder.Build();

app.UseCors("allowAny");

app.UseEndpointDefinitions();

Application.Configuration = app.Services.GetRequiredService<IConfiguration>();

DbUpdater.EnsureDatabaseSchemaUpToDate(app.Configuration.GetConnectionStringForStudyControlDb());

app.Run();

