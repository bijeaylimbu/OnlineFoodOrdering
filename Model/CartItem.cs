using System.ComponentModel.DataAnnotations;

namespace OnlineFoodOrdering.Model;

public class CartItem
{
    [Key] 
    public int Id { get; set; }
    public  string? User { get; set; }
    public int? ProductId { get; set; }
    public  string? ProductName { get; set; }
    public int? Price { get; set; }
    public string? Image { get; set; }
    public int? Quantity { get; set; } = 1;
    
    public  string? Purchase { get; set; }
    
    public string? Delivery { get; set; }
    
    [DataType(DataType.Date)]
    public  DateTime AddedToCartDateTime { get; set; }
}