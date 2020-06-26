using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class File_Folder
    {
        [Key]
        public int Id { get; set; }

        public int FolderId { get; set; }
        [ForeignKey("FolderId")]
        public virtual Folder Folder { get; set; }

        public int FileId { get; set; }
        [ForeignKey("FileId")]
        public virtual File File { get; set; }

    }
}
