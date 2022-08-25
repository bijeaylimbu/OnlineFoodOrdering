using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrdering.DataAccess;
using OnlineFoodOrdering.Model;

namespace OnlineFoodOrdering.Controllers;

public class CategoryController
{
    private readonly OnlineFoodOrderingDBContext context;

    public CategoryController(OnlineFoodOrderingDBContext _context)
    {
        context = _context;
    }
    [HttpPost]
    [Route("add-category")]
    public async Task<int> AddCategory([FromBody]Category categoryData)
    {
        try
        {
            Category category = new Category();
            category.Name = categoryData.Name;
            context.Add(category);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        return StatusCodes.Status201Created;
    }
    
    [HttpGet]
    [Route("get-all-category")]
    public async Task<List<Category>> GetAllCategory()
    {

        List<Category> category = await context.Category.ToListAsync();
        return category;
    }
    [HttpDelete]
    [Route("delete-category")]
    public async Task<int> DeleteCategoryById(int categoryId)
    {
        if (categoryId == null)
        {
            return StatusCodes.Status302Found;
        }

        var category = await context.Category.FirstOrDefaultAsync(x => x.Id == categoryId);
        context.Category.Remove(category);
        await context.SaveChangesAsync();

        return StatusCodes.Status202Accepted;
    }
}