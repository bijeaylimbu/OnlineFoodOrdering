using System.ComponentModel.DataAnnotations;

namespace OnlineFoodOrdering.Model;

public class Product
{
    [Key]
    public int? Id { get; set; }
    [Required(ErrorMessage = "product name is required")]
    public string? ProductName { get; set; }
    [Required(ErrorMessage = "price is required")]
    public int? Price { get; set; }
    public string? Image { get; set; }
    [Required(ErrorMessage = "quantity is required")]
    public int Quantity { get; set; }
    [Required(ErrorMessage = "food category is required")]
    public string? Category { get; set; }
    public int? Rating { get; set; }
}