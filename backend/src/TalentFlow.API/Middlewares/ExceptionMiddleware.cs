using System.Net;
using System.Text.Json;
using TalentFlow.Application.Exceptions.Auth;

namespace TalentFlow.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            await HandleExceptionAsync(context, exception);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new
        {
            Message = exception.Message
        };

        context.Response.StatusCode = exception switch
        {
            UserAlreadyExistsException => (int)HttpStatusCode.Conflict,

            InvalidCredentialsException => (int)HttpStatusCode.Unauthorized,

            UserNotFoundException => (int)HttpStatusCode.NotFound,

            _ => (int)HttpStatusCode.InternalServerError
        };

        var json = JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(json);
    }
}