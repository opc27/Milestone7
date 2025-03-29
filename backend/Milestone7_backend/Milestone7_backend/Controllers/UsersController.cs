using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using Milestone7_backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Milestone7_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var userList = await _context.Users
                .Include(u => u.Temple) // Join with the Temple table
                .Select(u => new
                {
                    u.UserId,
                    u.Username,
                    u.Firstname,
                    u.Lastname,
                    u.ProfilePicSrc,
                    TempleName = u.Temple != null ? u.Temple.TempleName : "No Temple", // Handle potential null value
                    u.CurrentModule
                })
                .ToListAsync();

            return Ok(userList);
        }

        [HttpGet("{userId}/currentModule")]
        public async Task<IActionResult> GetCurrentModule(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new { currentModule = user.CurrentModule });
        }
    }
}
