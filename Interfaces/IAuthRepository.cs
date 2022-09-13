using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Interfaces;

public interface IAuthRepository
{
    Task<IdentityResult> NewRegistration(Registration registration); 
    Task<ApplicationUser> LoginAsync(Login login);

    Task<List<ApplicationUser>> GetAllUserAsync();

    Task<int> UpdateUserAsync(string email, ApplicationUser userModel);
    
    Task<int> DeleteUserAsync(string email);
    
    Task<ApplicationUser> FindByEmailAsync(string email);
}