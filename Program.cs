using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrdering.DataAccess;
using OnlineFoodOrdering.Interfaces;
using OnlineFoodOrdering.Model;
using OnlineFoodOrdering.Repository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<OnlineFoodOrderingDBContext>(options =>
    options.UseNpgsql(connectionString),ServiceLifetime.Transient);
builder.Services.AddCors();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(
        options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 4;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        }
        )
    .AddEntityFrameworkStores<OnlineFoodOrderingDBContext>()
    .AddDefaultTokenProviders();
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseAuthorization();
app.MapControllers();

app.Run();
