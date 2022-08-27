using System.ComponentModel.DataAnnotations;

namespace OnlineFoodOrdering.Model;

public class CartItem
{
    [Key] 
    public int Id { get; set; }
    public  string User { get; set; }
    public int ProductId { get; set; }
    public int quantity { get; set; }
}