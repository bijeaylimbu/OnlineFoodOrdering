
using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrdering.Interfaces;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Controllers;
[Route("api")]
[ApiController]
public class AuthController: ControllerBase
{
    IAuthRepository authRepository;

    public AuthController(IAuthRepository _registrationRepository)
    {
       authRepository = _registrationRepository;
    } 
    [HttpPost]
    [Route("registration")]
   public async Task<int> Register([FromBody] Registration registration)
   {
      var result = await authRepository.NewRegistration(registration);
      return StatusCodes.Status201Created;
   }

   [HttpPost]
   [Route("login")]
   public async Task<IActionResult> Login([FromBody] Login login)
   {
      var result = await authRepository.LoginAsync(login);
      if (string.IsNullOrEmpty(result.ToString()))
      {
         return StatusCode(400);  
      }
      return Ok(result);
      }

   [HttpGet]
   [Route("all-user")]
   public async Task<List<ApplicationUser>> GetAllUser()
   {
      var user = await authRepository.GetAllUserAsync();
      return user;
   }
   
   [HttpPut]
   [Route("updated-user")]
   public async Task<int> UpdateUserAsync(string email, [FromBody] ApplicationUser applicationUser)
   {
      var user = await authRepository.UpdateUserAsync(email, applicationUser);
      return user;
   }
   
   
   [HttpDelete]
      [Route("delete-user")]
      public async Task<int> DeleteUserAsync(string email)
      {
         var user = await authRepository.DeleteUserAsync(email);
         return user;
      }
      
      [HttpGet]
      [Route("get-user-by-email")]
      public async Task<ApplicationUser> UpdateUserAsync(string email)
      {
         var user = await authRepository.FindByEmailAsync(email);
         return user;
      }
}