using System.Net;
using System.Text.Json;

using Microsoft.AspNetCore.Hosting;
using TalentFlow.Application.Exceptions.Auth;

namespace TalentFlow.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public ExceptionMiddleware(
        RequestDelegate next,
        IWebHostEnvironment env)
    {
        _next = next;
        _env = env;
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

    private async Task HandleExceptionAsync(
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

        var isDevelopment = _env.IsDevelopment();
        var message = isDevelopment
            ? exception.Message
            : GetGenericErrorMessage(context.Response.StatusCode);

        var response = new
        {
            message
        };

        var json =
            JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(
            json
        );
    }

    private static string GetGenericErrorMessage(int statusCode)
    {
        return statusCode switch
        {
            (int)HttpStatusCode.Unauthorized => "Unauthorized.",
            (int)HttpStatusCode.Forbidden => "Access denied.",
            (int)HttpStatusCode.NotFound => "Resource not found.",
            (int)HttpStatusCode.BadRequest => "Invalid request.",
            (int)HttpStatusCode.Conflict => "Resource already exists.",
            _ => "Internal server error."
        };
    }
}