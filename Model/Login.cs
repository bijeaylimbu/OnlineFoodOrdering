using System.ComponentModel.DataAnnotations;

namespace OnlineFoodOrdering.Model;

public class Login
{
    [Required(ErrorMessage = "username is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "password is required")]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}