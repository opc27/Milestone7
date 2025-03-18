using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=templeprepdata.db"));

// Define allowed frontend ports (3000-3100)
var allowedOrigins = Enumerable.Range(3000, 101)  // Ports 3000-3100
    .Select(port => $"http://localhost:{port}")
    .ToArray();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.WithOrigins("http://localhost:3003"));

app.UseAuthorization();

app.MapControllers();

app.Run();
