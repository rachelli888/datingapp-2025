# Copilot / AI Agent Instructions for DatingApp

This file contains focused, actionable guidance for AI coding agents to be immediately productive in this repository.

**Big Picture**
- **Architecture**: ASP.NET Core Web API (`API/`) serving a small Angular client (`client/`). The backend uses Entity Framework Core with SQLite (see `API/Program.cs`), JWT authentication (see `API/Services/TokenService.cs` and `Program.cs`), and a custom `ExceptionMiddleware` for consistent JSON error responses.
- **Data model**: `API/Entities` contains `AppUser`, `Member`, and `Photo`. `AppUser` is the identity root and holds a `Member` navigation property with the same `Id` (see `API/Entities/Member.cs` and `API/Entities/AppUser.cs`). Seed data is in `API/Data/UserSeedData.json` and seeded by `API/Data/Seed.cs` during startup.

**Key Files to Read First**
- `API/Program.cs` — service registration, CORS, auth, automatic DB migration + seeding.
- `API/Services/TokenService.cs` — JWT creation; requires `TokenKey` >= 64 chars in configuration.
- `API/Middleware/ExceptionMiddleware.cs` — centralized error handling and JSON response shape (`API/Errors/ApiException.cs`).
- `API/Data/AppDbContext.cs` — EF Core DbSets and schema surface.
- `API/Controllers/*` — controller patterns (see `AccountController.cs`, `MembersController.cs`).
- `client/` — Angular frontend; `ng serve` runs at `http://localhost:4200`.

**Repository-specific Conventions & Patterns**
- Controllers use C# primary-constructor syntax (e.g., `public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController`). Use the same concise style when adding controllers.
- DTOs are placed in `API/DTOs/` and used for inbound/outbound shapes (examples: `RegisterDto.cs`, `UserDto.cs`). Match these DTOs when modifying API contracts.
- Passwords are hashed with HMACSHA512 and stored as `PasswordHash` and `PasswordSalt` on `AppUser` (see `AccountController.cs` and `Seed.cs`). When creating tests or manual inserts, ensure hashes and salts are consistent.
- The `Member` entity uses `DateOnly` for `DateOfBirth` and a `Photos` list — migrations may be required when changing types.
- Navigation mapping: `Member` uses `[ForeignKey(nameof(Id))]` to link to `AppUser` with the same primary key. Be careful if splitting identity vs. profile into separate keys.

**Auth & Secrets**
- The app reads `TokenKey` via `builder.Configuration["TokenKey"]`. Ensure a secret value is set in environment variables or `appsettings.Development.json`. Token length is validated in `TokenService` (>= 64 chars).
- JWT authentication is configured in `Program.cs`. Controllers that require authentication use `[Authorize]` (see `MembersController.GetMember`).

**Database & Migrations**
- The app calls `context.Database.MigrateAsync()` during startup and then `Seed.SeedUsers(context)`. Running the API (`dotnet run`) will apply migrations automatically.
- To manage migrations manually (when adding/modifying entities):
  - From `API/` run: `dotnet ef migrations add <Name>` then `dotnet ef database update`.
  - If EF CLI isn't installed, either install the dotnet-ef tool or rely on the automatic migration in `Program.cs` for local development.

**Local Dev / Run Commands (PowerShell)**
- Backend (from repo root):
```
cd API; dotnet restore; dotnet run
```
  - `dotnet run` will apply pending migrations and seed the DB at startup.
- Frontend (Angular):
```
cd client; npm install; npm start
```
  - The backend expects the client at `http://localhost:4200` (CORS configured in `Program.cs`).

**Testing & Debugging Notes**
- There are no unit tests in the repository. For quick manual validation, use Postman or the Angular UI.
- Use the `ExceptionMiddleware` JSON schema for consistent error handling. In development, stack traces are included in the response.
- Logging: exceptions are logged in `Program.cs` when migrations or seeding fail — check console output.

**Integration Points & External Dependencies**
- SQLite via EF Core is used as the default DB provider (`UseSqlite`). Connection strings are configured in `appsettings.json`.
- The Angular client runs separately but is expected to call the API at `http://localhost:5000` or the local port the backend uses; CORS is already open to `http://localhost:4200`.

**What to change carefully**
- Changing `AppUser` primary key or the `Member`/`AppUser` FK pattern requires careful migration strategy.
- Changing `TokenKey` behavior affects authentication/issued tokens and may invalidate existing tokens.
- Modifying `Seed` logic will affect local demo data; keep `UserSeedData.json` shape when updating.

**Examples (copyable snippets)**
- Create a controller using the repository pattern and primary-constructor style:
```csharp
public class PhotosController(AppDbContext context) : BaseApiController
{
    [HttpGet("{memberId}/photos")]
    public async Task<IActionResult> GetPhotos(string memberId) => Ok(await context.Photos.Where(p => p.MemberId == memberId).ToListAsync());
}
```

**If you need more**
- Ask for the specific area you want more detail on (migrations, EF queries, authentication flows, or client integration). Indicate whether you want runnable examples or tests added.

---
Please review and tell me if you want any section expanded (e.g., example API requests, migration checklist, or a short developer onboarding script). 
