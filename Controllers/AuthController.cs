using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrdering.Interfaces;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Controllers;
[Route("api")]
[ApiController]
public class AuthController: ControllerBase
{
    IAuthRepository registrationRepository;

    public AuthController(IAuthRepository _registrationRepository)
    {
       registrationRepository = _registrationRepository;
    } 
    [HttpPost]
    [Route("registration")]
   public async Task<IActionResult> Register([FromBody] Registration registration)
   {
      var result = await registrationRepository.NewRegistration(registration);
      if (result.Succeeded)
      {
         return Ok(result.Succeeded);
      }

      return BadRequest("sorry cannot register");
   }

   [HttpPost]
   [Route("login")]
   public async Task<IActionResult> Login([FromBody] Login login)
   {
      // var existingUser = await onlineFoodOrderingDbContext.Registration.FirstOrDefaultAsync(x => x.Email ==login.Email );
      //    if (existingUser == null)
      //       return BadRequest("email doesn't exit");
         var result = await registrationRepository.LoginAsync(login);
         if (string.IsNullOrEmpty(result))
         {
            return Unauthorized();
         }
   
         return Ok(result);
      }
}