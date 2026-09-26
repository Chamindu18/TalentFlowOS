FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY backend/src/TalentFlow.API/TalentFlow.API.csproj backend/src/TalentFlow.API/
COPY backend/src/TalentFlow.Application/TalentFlow.Application.csproj backend/src/TalentFlow.Application/
COPY backend/src/TalentFlow.Domain/TalentFlow.Domain.csproj backend/src/TalentFlow.Domain/
COPY backend/src/TalentFlow.Infrastructure/TalentFlow.Infrastructure.csproj backend/src/TalentFlow.Infrastructure/

RUN dotnet restore backend/src/TalentFlow.API/TalentFlow.API.csproj

COPY backend/src/ backend/src/

WORKDIR /src/backend/src/TalentFlow.API
RUN dotnet publish TalentFlow.API.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/publish .

CMD ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} dotnet TalentFlow.API.dll"]