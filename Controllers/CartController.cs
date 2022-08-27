using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrdering.DataAccess;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Controllers;
[ApiController]
[Route("api")]
public class CartController
{
    private readonly OnlineFoodOrderingDBContext context;

    public CartController(OnlineFoodOrderingDBContext _context)
    {
        context = _context;
    }
    [HttpPost]
    [Route("add-cart")]
    public async Task<int> AddCart([FromBody] CartItem cartModel)
    {
        CartItem cartItem = new CartItem();
        cartItem.ProductId = cartModel.ProductId;
        cartItem.User = cartModel.User;
        cartItem.quantity = cartModel.quantity;
        context.Add(cartItem);
        await context.SaveChangesAsync();
        return StatusCodes.Status201Created;
    }
    
    [HttpGet]
    [Route("get-cart")]
    public async Task<CartItem> GetCartItemByEmail(string email)
    {
        if (email == null)
        {
            return null;
        }

        var cart = await context.Cart.FirstOrDefaultAsync(x => x.User == email);
        if (cart == null)
        {
            return null;
        }

        return cart;
    }
    
    [HttpGet]
    [Route("get-all-cart")]
    public async Task<CartItem?> GetaAllCartItemByEmail(string email)
    {
        if (email == null)
        {
            return null;
        }

        var cart = await context.Cart.FirstOrDefaultAsync(x => x.User == email);
        return cart;
    }
    
    [HttpPut]
    [Route("updated-cart-item")]
    public async Task<int> UpdateCartItemAsync(int id, [FromBody]CartItem cartItemModel)
    {
        var cart = await context.Product.FindAsync(id);
        if (cart == null)
        {
            return StatusCodes.Status302Found;
        }

        cart.Quantity = cartItemModel.quantity;
        context.Product.Update(cart);
        await context.SaveChangesAsync();
        return StatusCodes.Status202Accepted;
    }
    
    [HttpDelete]
    [Route("delete-cart-item")]
    public async Task<int> DeleteCartItemById(int cartId)
    {
        if (cartId == null)
        {
            return StatusCodes.Status302Found;
        }

        var cart = await context.Product.FirstOrDefaultAsync(x => x.Id == cartId);
        context.Product.Remove(cart);
        await context.SaveChangesAsync();

        return StatusCodes.Status202Accepted;
    }
}