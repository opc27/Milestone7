using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Milestone7_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TemplesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TemplesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetTemplesData")]
        public async Task<IActionResult> Get()
        {
            var templeList = await _context.Temples
                .Select(t => new
                {
                    t.TempleId,
                    t.TempleName,
                    t.TempleImgSrc
                })
                .ToListAsync();

            return Ok(templeList);
        }
    }
}
