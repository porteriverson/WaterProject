using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
public class WaterController : Controller
{
    private WaterDbContext _watercontext;
    
    public WaterController(WaterDbContext temp) => _watercontext = temp;
    
    // GET
    [HttpGet("AllProjects")]
    public IActionResult Get(int pageSize = 5, int pageNum = 1)
    {
        string? favProjectType = Request.Cookies["favoriteProjectType"];
        Console.WriteLine("======> COOKIE <====== \n" + favProjectType);
        
        HttpContext.Response.Cookies.Append("favoriteProjectType", "Borehole Well and Hand Pump", 
            new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(5)
            });
        
        var returner = _watercontext.Projects
            .Skip((pageNum - 1) * pageSize)
        .Take(pageSize)
        .ToList();
        
        var totalNumProjects = _watercontext.Projects.Count();

        var returnObject = new
        {
            Projects = returner,
            TotalNumProjects = totalNumProjects
        };

        return Ok(returnObject);
    }
    [HttpGet("FunctionalProjects")]
    public IEnumerable<Project> GetFunctionProjects()
    {
        var functional = _watercontext.Projects
            .Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return functional;
    }
}
}