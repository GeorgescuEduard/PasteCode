using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Paste.Models;

namespace Paste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShareController : ControllerBase
    {
        private readonly DBContext _context;

        public ShareController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Share/5
        [HttpGet("{id}")]
        public ActionResult<Share> GetShare(string id)
        {
            return _context.Share.SingleOrDefault(t => t.IdentityString == id);
        }

        [HttpGet]
        [Route("ShareCount")]
        public bool GetFileCount(int id)
        {
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (_context.Share.Count(w => w.FileId == id) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        // PUT: api/Share/5
        [HttpPut("{id}")]
        public IActionResult PutShared(int id, Share share)
        {
            var entity = _context.Share.FirstOrDefault(e => e.FileId == id);

            entity.Name = share.Name;
            entity.Description = share.Description;
            entity.Syntax = share.Syntax;
            entity.IdentityString = share.IdentityString;
            entity.LastModified = share.LastModified;
            entity.Content = share.Content;
            entity.FileId = share.FileId;

            _context.SaveChanges();

            return NoContent();
        }


        // POST: api/Share
        [HttpPost]
        public async Task<ActionResult<Share>> PostShare(Share share)
        {
            _context.Share.Add(share);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShare", new { id = share.Id }, share);
        }

        // DELETE: api/Share/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Share>> DeleteShare(int id)
        {
            var share = await _context.Share.FindAsync(id);
            if (share == null)
            {
                return NotFound();
            }

            _context.Share.Remove(share);
            await _context.SaveChangesAsync();

            return share;
        }

        private bool ShareExists(int id)
        {
            return _context.Share.Any(e => e.Id == id);
        }
    }
}
