using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class UserAccount : IdentityUser
    {
        [Column(TypeName = "nvarchar(30)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string VerificationCode { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime ExpCode { get; set; }

        public virtual ICollection<File> File { get; set; }

        public virtual ICollection<Folder> Folder { get; set; }
    }
}
