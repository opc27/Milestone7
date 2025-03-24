using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace Milestone7_backend.Models
{
    public class LoginRequestModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}