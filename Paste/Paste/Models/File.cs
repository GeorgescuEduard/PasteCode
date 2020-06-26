using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class File
    {
        [Key]
        public int FileId { get; set; }

        [Column(TypeName = "varchar(30)")]
        [Required]
        [MinLength(1)]
        public string Name { get; set; }

        [Column(TypeName = "varchar(150)")]
        public string Description { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Syntax { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime LastModified { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? ExpirationDate { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        [Required]
        [MinLength(1)]
        public string Content { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Tags { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserAccount UserAccount { get; set; }

    }
}
