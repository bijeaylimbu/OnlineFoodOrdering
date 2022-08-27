using Microsoft.AspNetCore.Identity;
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
      if (result.Succeeded)
      {
         return StatusCodes.Status201Created;
      }

      return StatusCodes.Status501NotImplemented;
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
   public async Task<int> UpdateUserAsync(string id, [FromBody] ApplicationUser applicationUser)
   {
      var user = await authRepository.UpdateUserAsync(id, applicationUser);
      return user;
   }
}