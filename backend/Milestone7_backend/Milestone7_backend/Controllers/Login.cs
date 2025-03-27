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

            var sessionId = Guid.NewGuid().ToString();
            HttpContext.Response.Cookies.Append("userSession", sessionId, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // set to true if everything is https
                SameSite = SameSiteMode.Strict, // if CORS gets mad change this to None
                Expires = DateTime.Now.AddHours(1) // expires every hour

            });

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
            {
                Console.WriteLine("Password does not match.");
                return Unauthorized(new { message = "Invalid username or password" });
            }

            Console.WriteLine("Login successful!");
            return Ok(new { message = "Login successful", userId = user.UserId });
        }

        [HttpGet("protected")]
        public IActionResult ProtectedEndpoint()
        {
            // Check if the user has a session cookie
            if (!HttpContext.Request.Cookies.TryGetValue("userSession", out string? sessionToken))
                return Unauthorized(new { message = "Not authenticated" });

            // Session exists, so user is authenticated
            return Ok(new { message = "You are authenticated!" });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Remove the session cookie
            HttpContext.Response.Cookies.Delete("userSession");

            return Ok(new { message = "Logout successful" });
        }

    }
}