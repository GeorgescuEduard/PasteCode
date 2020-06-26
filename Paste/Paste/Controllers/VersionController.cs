using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Paste.Models;
using Version = Paste.Models.Version;

namespace Paste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        private readonly DBContext _context;

        public VersionController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Version
  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Version>>> GetVersion(int FileId)
        {
            return await _context.Version.Where(t => t.FileId == FileId).OrderByDescending(a => a.Date).ToListAsync();
        }

        // PUT: api/Version/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVersion(int id, Version version)
        {
            if (id != version.Id)
            {
                return BadRequest();
            }

            _context.Entry(version).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VersionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Version
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Version>> PostVersion(Version version)
        {
            _context.Version.Add(version);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVersion", new { id = version.Id }, version);
        }

        // DELETE: api/Version/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Version>> DeleteVersion(int id)
        {
            var version = await _context.Version.FindAsync(id);
            if (version == null)
            {
                return NotFound();
            }

            _context.Version.Remove(version);
            await _context.SaveChangesAsync();

            return version;
        }

        private bool VersionExists(int id)
        {
            return _context.Version.Any(e => e.Id == id);
        }
    }
}
