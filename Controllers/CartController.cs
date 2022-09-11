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
        cartItem.Price = cartModel.Price;
        cartItem.Quantity = cartModel.Quantity;
        cartItem.Image = cartModel.Image;
        cartItem.ProductName = cartModel.ProductName;
         cartItem.AddedToCartDateTime=DateTime.Now;
         cartItem.Delivery = cartModel.Delivery;
         cartItem.Purchase = cartModel.Purchase;
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
    public async Task<List<CartItem>> GetaAllCartItemByEmail(string email)
    {
        if (email == null)
        {
            return null;
        }

        var cart = context.Cart.Where(x => x.User == email).OrderByDescending(x=>x.AddedToCartDateTime).ToList();
        return cart;
    }
    
    [HttpPut]
    [Route("updated-cart-item")]
    public async Task<int> UpdateCartItemAsync(int id, [FromBody]CartItem cartItemModel)
    {
        var cart = await context.Cart.FindAsync(id);
        if (cart == null)
        {
            return StatusCodes.Status302Found;
        }

        cart.User = cartItemModel.User;
        cart.ProductId = cartItemModel.ProductId;
        cart.ProductName = cartItemModel.ProductName;
        cart.Price = cartItemModel.Price;
        cart.Image = cartItemModel.Image;
        cart.Purchase = cartItemModel.Purchase;
        cart.Delivery = cartItemModel.Delivery;
        cart.Quantity = cartItemModel.Quantity;
        cart.AddedToCartDateTime = cartItemModel.AddedToCartDateTime;
        context.Cart.Update(cart);
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

        var cart = await context.Cart.FirstOrDefaultAsync(x => x.Id == cartId);
        context.Cart.Remove(cart);
        await context.SaveChangesAsync();

        return StatusCodes.Status202Accepted;
    }
}