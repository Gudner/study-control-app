using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Database;

[Table(nameof(SubjectCard))]
public class SubjectCard
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int SubjectCardId { get; set; }
    [Required]
    public string SubjectName { get; set; }
    [Required]
    public string TeacherName { get; set; }
    public List<Control> Controls { get; set; }
}
