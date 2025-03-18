using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Milestone7_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetEventsData")]
        public async Task<IActionResult> Get()
        {
            var eventList = await _context.Events
                .Select(e => new
                {
                    e.EventId,
                    e.UserId,
                    e.EventType,
                    e.EventDate
                })
                .ToListAsync();

            return Ok(eventList);
        }
    }
}
