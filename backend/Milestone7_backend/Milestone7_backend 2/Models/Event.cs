namespace Milestone7_backend.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public int UserId { get; set; }
        public string EventType { get; set; }
        public DateTime EventDate { get; set; } // Using DateTime in C#

        public User User { get; set; }
    }

}
