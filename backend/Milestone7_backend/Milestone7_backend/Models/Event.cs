using Milestone7_backend.Models;
using System.ComponentModel.DataAnnotations;

public class Event
{
    public int EventId { get; set; }
    public int UserId { get; set; }

    [Required]
    public string EventType { get; set; } = string.Empty;

    [Required]
    public string EventDate { get; set; }

    public string? Time { get; set; }

    public User? User { get; set; }
}