using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milestone7_backend.Data;
using Milestone7_backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Milestone7_backend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find user by username in the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // idk hashes I guess; not testing it right now.
            //bool passwordMatches = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
            bool passwordMatches = user.Password == model.Password;

            if (!passwordMatches)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(new { message = "Login successful", userId = user.UserId });
        }
    }
}