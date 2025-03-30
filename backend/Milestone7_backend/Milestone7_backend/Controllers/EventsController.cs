using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using Milestone7_backend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Milestone7_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize] // Only authenticated users can access these endpoints.
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Events
        // Returns all events for the currently logged in user.
        [HttpGet(Name = "GetEventsData")]
        public async Task<IActionResult> Get()
        {
            // Get the username from the simulated authentication.
            var currentUserName = User.Identity.Name;
            if (string.IsNullOrEmpty(currentUserName))
            {
                return Unauthorized("User is not authenticated.");
            }

            // Retrieve events that belong to the currently logged in user.
            var eventList = await _context.Events
                .Include(e => e.User)
                .Where(e => e.User.Username == currentUserName)
                .Select(e => new
                {
                    e.EventId,
                    e.UserId,
                    e.EventType,
                    e.EventDate,
                    e.Time
                })
                .ToListAsync();

            return Ok(eventList);
        }

        // POST: /Events
        // Accepts a new event in the request body and saves it to the database.
        [HttpPost(Name = "AddEvent")]
        public async Task<IActionResult> Post([FromBody] Event eventData)
        {
            // Ensure the current user is authenticated.
            var currentUserName = User.Identity.Name;
            if (string.IsNullOrEmpty(currentUserName))
            {
                return Unauthorized("User is not authenticated.");
            }

            // Find the user in the database using the username.
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == currentUserName);
            if (user == null)
            {
                return Unauthorized("User not found in the database.");
            }

            // Set the UserId for the new event.
            eventData.UserId = user.UserId;

            // Add the new event to the database.
            _context.Events.Add(eventData);
            await _context.SaveChangesAsync();

            // Return the newly created event.
            return CreatedAtAction(nameof(Get), new { id = eventData.EventId }, eventData);
        }

        // PUT: /Events/{id}
        // Updates an existing event
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Event eventData)
        {
            var currentUserName = User.Identity.Name;
            if (string.IsNullOrEmpty(currentUserName))
            {
                return Unauthorized("User is not authenticated.");
            }

            var existingEvent = await _context.Events
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.EventId == id && e.User.Username == currentUserName);

            if (existingEvent == null)
            {
                return NotFound();
            }

            existingEvent.EventType = eventData.EventType;
            existingEvent.EventDate = eventData.EventDate;
            existingEvent.Time = eventData.Time;

            await _context.SaveChangesAsync();
            return Ok(existingEvent);
        }

        // DELETE: /Events/{id}
        // Deletes an event
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var currentUserName = User.Identity.Name;
            if (string.IsNullOrEmpty(currentUserName))
            {
                return Unauthorized("User is not authenticated.");
            }

            var eventToDelete = await _context.Events
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.EventId == id && e.User.Username == currentUserName);

            if (eventToDelete == null)
            {
                return NotFound();
            }

            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
