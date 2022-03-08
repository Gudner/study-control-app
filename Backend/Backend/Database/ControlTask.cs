using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Database;
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
    public Control Control { get; set; }
}
