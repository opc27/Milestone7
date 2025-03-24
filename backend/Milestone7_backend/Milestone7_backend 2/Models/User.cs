using Microsoft.Extensions.Logging;
using System;

namespace Milestone7_backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string? ProfilePicSrc { get; set; }
        public int? TempleId { get; set; }
        public int CurrentModule { get; set; } = 1;

        public Temple? Temple { get; set; }
        public List<Event> Events { get; set; } = new();
    }

}
