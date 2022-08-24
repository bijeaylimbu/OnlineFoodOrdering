using Microsoft.AspNetCore.Identity;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Interfaces;

public interface IAuthRepository
{
    Task<IdentityResult> NewRegistration(Registration registration); 
    Task<string> LoginAsync(Login login);


}