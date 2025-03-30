using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure SQLite database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=templeprepdata.db"));

// Register the custom authentication scheme using our AuthenticationHandler.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Custom";
    options.DefaultChallengeScheme = "Custom";
})
.AddScheme<AuthenticationSchemeOptions, AuthenticationHandler>("Custom", options => { });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Enable authentication middleware.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
