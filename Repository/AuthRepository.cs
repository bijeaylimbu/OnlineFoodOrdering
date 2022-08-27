using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    public async Task<ApplicationUser> LoginAsync(Login login)
    {
        var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, false, false);
        if (!result.Succeeded)
        {
            return null;
        }

        var user = userManager.FindByEmailAsync(login.Email);
        return await user;
    }

    public async Task<List<ApplicationUser>> GetAllUserAsync()
    {
        var user = await userManager.Users.OrderBy(x=>x.Id).ToListAsync();
        return user;
    }

    public async Task<int> UpdateUserAsync(string id, ApplicationUser userModel)
    {
        var user = await userManager.FindByEmailAsync(id);
        if (user == null)
        {
            return StatusCodes.Status302Found;
        }

        user.FirstName = userModel.FirstName;
        user.LastName = userModel.LastName;
        user.Role = userModel.Role;
        user.Email = userModel.Email;
        user.PasswordHash = user.PasswordHash;
        await userManager.UpdateAsync(user);
        return StatusCodes.Status202Accepted;
    }
}