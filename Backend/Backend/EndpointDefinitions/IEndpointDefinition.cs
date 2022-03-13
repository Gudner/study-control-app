namespace Backend.EndpointDefinitions;

public interface IEndpointDefinition
{
    void DefineServices(IServiceCollection services);

    void DefineEndpoints(WebApplication app);

    static ILogger<T> InjectLogger<T>(WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();
        var services = serviceScope.ServiceProvider;
        return services.GetRequiredService<ILogger<T>>();
    }
}
