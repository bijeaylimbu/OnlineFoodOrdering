using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrdering.DataAccess;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Controllers;
[Route("api")]
[ApiController]
public class ProductController
{
    private readonly OnlineFoodOrderingDBContext context;

    public ProductController(OnlineFoodOrderingDBContext _context)
    {
        context = _context;
    }
    [HttpPost]
    [Route("add-product")]
    public async Task<int> AddProduct([FromBody]Product productData)
    {
        try
        {
            Product product = new Product();
            product.ProductName = productData.ProductName;
            product.Price = productData.Price;
            product.Quantity = productData.Quantity;
            product.Category = productData.Category;
            product.Image = productData.Image;
            context.Add(product);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        return StatusCodes.Status201Created;
    }
    
    [HttpGet]
    [Route("get-product")]
    public async Task<Product> GetProductById(int productId)
    {
        if (productId == null)
        {
            return null;
        }

        var product = await context.Product.FirstOrDefaultAsync(x => x.Id == productId);
        if (product == null)
        {
            return null;
        }

        return product;
    }
    [HttpGet]
    [Route("get-all-product")]
    public async Task<List<Product>> GetAllProduct()
    {

        List<Product> product = await context.Product.OrderBy(x=>x.Id).ToListAsync();
        return product;
    }
    [HttpDelete]
    [Route("delete-product")]
    public async Task<int> DeleteProductById(int productId)
    {
        if (productId == null)
        {
            return StatusCodes.Status302Found;
        }

        var product = await context.Product.FirstOrDefaultAsync(x => x.Id == productId);
         context.Product.Remove(product);
         await context.SaveChangesAsync();

        return StatusCodes.Status202Accepted;
    }
    
    [HttpPut]
    [Route("updated-product")]
    public async Task<int> UpdateProductAsync(int id, [FromBody]Product productModel)
    {
        var product = await context.Product.FindAsync(id);
        if (product == null)
        {
            return StatusCodes.Status302Found;
        }

        product.ProductName = productModel.ProductName;
        product.Price = productModel.Price;
        product.Image = productModel.Image;
        product.Quantity = productModel.Quantity;
        product.Category = productModel.Category;
        context.Product.Update(product);
        await context.SaveChangesAsync();
        return StatusCodes.Status202Accepted;
    }
}