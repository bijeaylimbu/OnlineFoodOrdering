using Microsoft.AspNetCore.Identity;

namespace OnlineFoodOrdering.Model;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; }
}