using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class Folder
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string Parent { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserAccount UserAccount { get; set; }

    }
}
