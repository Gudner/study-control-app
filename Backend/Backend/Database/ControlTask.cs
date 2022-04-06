using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Database;

public class ControlTaskRequestBody
{
    public int ControlId { get; set; }
    public string TaskText { get; set; }
}

[Table(nameof(ControlTask))]
public class ControlTask
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ControlTaskId { get; set; }
    [Required]
    public string TaskText { get; set; }
    [Required]
    public bool IsDone { get; set; }
    public int ControlId { get; set; }
    [JsonIgnore]
    public Control Control { get; set; }
}
