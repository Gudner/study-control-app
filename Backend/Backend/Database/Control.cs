using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Database;

public enum ControlType
{
    TK1,
    PK1,
    TK2,
    PK2
}

public class ControlRequestBody
{
    public int SubjectCardId { get; set; }
    public string ControlType { get; set; }
    public DateTime DeadlineDate { get; set; }
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
    [JsonIgnore]
    public SubjectCard SubjectCard { get; set; }
    public List<ControlTask> ControlTasks { get; set; }
}
