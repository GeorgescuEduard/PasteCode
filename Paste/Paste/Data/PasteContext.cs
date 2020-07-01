using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Paste.Models;

namespace Paste.Data
{
    public class PasteContext : DbContext
    {
        public PasteContext (DbContextOptions<PasteContext> options)
            : base(options)
        {
        }

        public DbSet<Paste.Models.Version> Version { get; set; }
    }
}
