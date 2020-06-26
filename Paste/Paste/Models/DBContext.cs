using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paste.Models
{
    public class DBContext : IdentityDbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }

        public DbSet<UserAccount> UserAccount { get; set; }
        public DbSet<File> File { get; set; }
        public DbSet<File_Folder> File_Folder { get; set; }
        public DbSet<Share> Share { get; set; }
        public DbSet<Folder> Folder { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<Version> Version { get; set; }

    }
}
