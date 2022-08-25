using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrdering.Configuration;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.DataAccess;

public class OnlineFoodOrderingDBContext : IdentityDbContext<ApplicationUser>
{
    public OnlineFoodOrderingDBContext(DbContextOptions<OnlineFoodOrderingDBContext> options) 
        : base(options)
    {
        
    }
    public DbSet<Product> Product{ get; set; }
    public DbSet<Category> Category { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new RoleConfiguration());
    }
}