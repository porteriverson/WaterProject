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
    public IEnumerable<Project> Get()
    {
        var returner = _watercontext.Projects.ToList();
        return returner;
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