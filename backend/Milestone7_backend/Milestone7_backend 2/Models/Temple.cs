using System.Text.Json.Serialization;

namespace Milestone7_backend.Models
{
    public class Temple
    {
        public int TempleId { get; set; }
        public string TempleName { get; set; }
        public string? TempleImgSrc { get; set; }

        [JsonIgnore]
        public List<User> Users { get; set; } = new();
    }

}
