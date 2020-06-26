using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class Version
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Description { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string VersionTag { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Syntax { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime Date { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Content { get; set; }

        public int FileId { get; set; }
        [ForeignKey("FileId")]
        public virtual File File { get; set; }

    }
}
