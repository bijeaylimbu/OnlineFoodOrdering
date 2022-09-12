using System.ComponentModel.DataAnnotations;
namespace OnlineFoodOrdering.Model;

public class Registration
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "First Name is required")]
    public string FirstName { get; set; }
    [Required(ErrorMessage = "Last Name is required")]
    public string LastName { get; set; }
    [Required(ErrorMessage = "Email is required")]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    [Required(ErrorMessage = "Phone Number is required")]
    [DataType(DataType.PhoneNumber)]
    public string PhoneNumber { get; set; }
    [Required(ErrorMessage = "Password is required")]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required(ErrorMessage = " Password is required")]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Password doesn't match")]
    public string ConfirmPassword { get; set; }
}