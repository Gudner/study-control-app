using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Database;

public enum ControlType
{
    CC1,
    IC1,
    CC2,
    IC2
}

[Table(nameof(Control))]
public class Control
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ControlId { get; set; }
    [Required]
    [Column(TypeName = "nvarchar(128)")]
    public ControlType ControlType { get; set; }
    [Required]
    public DateTime DeadlineDate { get; set; }
    public int SubjectCardId { get; set; }
    public SubjectCard SubjectCard { get; set; }
    public List<ControlTask> ControlTasks { get; set; }
}
