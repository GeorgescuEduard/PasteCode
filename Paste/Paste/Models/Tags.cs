using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class Tags
    {
        [Key]
        public int TagId { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string TagDescription { get; set; }

        public int FileId { get; set; }
        [ForeignKey("FileId")]
        public virtual File File { get; set; }
    }
}
