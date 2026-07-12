using System.Net;
using System.Text.Json;

using TalentFlow.Application.Exceptions.Auth;

namespace TalentFlow.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(
        RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(
        HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            await HandleExceptionAsync(
                context,
                exception
            );
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType =
            "application/json";

        context.Response.StatusCode =
            exception switch
            {
                UserAlreadyExistsException =>
                    (int)HttpStatusCode.Conflict,

                InvalidCredentialsException =>
                    (int)HttpStatusCode.Unauthorized,

                EmailNotVerifiedException =>
                    (int)HttpStatusCode.Forbidden,

                UserNotFoundException =>
                    (int)HttpStatusCode.NotFound,

                InvalidVerificationTokenException =>
                    (int)HttpStatusCode.BadRequest,

                ExpiredVerificationTokenException =>
                    (int)HttpStatusCode.BadRequest,

                InvalidResetPasswordTokenException =>
                    (int)HttpStatusCode.BadRequest,

                ExpiredResetPasswordTokenException =>
                    (int)HttpStatusCode.BadRequest,

                _ =>
                    (int)HttpStatusCode.InternalServerError
            };

        var response = new
        {
            message = exception.Message
        };

        var json =
            JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(
            json
        );
    }
}