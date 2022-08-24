using Microsoft.AspNetCore.Identity;
using OnlineFoodOrdering.DataAccess;
using OnlineFoodOrdering.Interfaces;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Repository;

public class AuthRepository: IAuthRepository
{
    private OnlineFoodOrderingDBContext dbContext;
    private readonly SignInManager<ApplicationUser> signInManager;
    private readonly UserManager<ApplicationUser> userManager;
    public AuthRepository(OnlineFoodOrderingDBContext _dbContext,
        SignInManager<ApplicationUser> _signInManager,
        UserManager<ApplicationUser> _userManager)
    {
        dbContext = _dbContext;
        signInManager = _signInManager;
        userManager = _userManager;
    }
    public async Task<IdentityResult> NewRegistration(Registration registration)
    {
        var user = new ApplicationUser()
        {
            FirstName = registration.FirstName,
            LastName = registration.LastName,
            Email = registration.Email,
            UserName = registration.Email,
            Role = "Viewer"

        };
        return await userManager.CreateAsync(user, registration.Password);
    }

    public async Task<string> LoginAsync(Login login)
    {
        var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, false, false);
        if (!result.Succeeded)
        {
            return null;
        }
    
        return "Success";
    }
}