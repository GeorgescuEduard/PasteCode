using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Paste.Models;

namespace Paste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly DBContext _context;

        public FileController(DBContext context)
        {
            _context = context;
        }

        // GET: api/File
        [HttpGet]
        public async Task<ActionResult<IEnumerable<File>>> GetContactDetail(int skip, int take)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return await _context.File.Where(t => t.UserId == userId && ( t.ExpirationDate > DateTime.Now || t.ExpirationDate == null))
                .OrderBy(t => t.Name).Skip(skip).Take(take).Select(t => new File()
                {
                    FileId = t.FileId,
                    Name = t.Name,
                    Description = t.Description,
                    Syntax = t.Syntax,
                    LastModified = t.LastModified,
                    ExpirationDate = t.ExpirationDate,
                    Tags = t.Tags,
                    Content = t.Content
                }).ToListAsync();

        }

        [HttpGet("{id}")]
        public ActionResult<File> GetShare(int id)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var file = _context.File.FirstOrDefault(t => t.FileId == id);

            if (file == null)
            {
                return NotFound();
            }

            if (userId != file.UserId)
            {
                return NotFound();
            }

            if (DateTime.Now > file.ExpirationDate) {
                _context.File.Remove(file);
                _context.SaveChangesAsync();
                return NotFound();
            }

            return file;
        }

        [HttpGet]
        [Route("Content")]
        public string GetFileContent(int fileid)
        {

            return _context.File.Where(t => t.FileId == fileid).ToString();

        }

        [HttpGet]
        [Route("FindBySyntax")]
        public async Task<ActionResult<IEnumerable<File>>> SelectBySyntax(string syntax)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return await _context.File.Where(t => t.Syntax == syntax && t.UserId == userId).ToListAsync();

        }

        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<File>>> SearchAction(string search)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return await _context.File.Where(t => t.Name.Contains(search) || t.Syntax.Contains(search) && t.UserId == userId).ToListAsync();

        }

        // PUT: api/File/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFile(int id, File file)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            file.UserId = userId;

            if (id != file.FileId)
            {
                return BadRequest();
            }

            _context.Entry(file).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FileExists(id))
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

        // POST: api/File

        [HttpPost]
        public async Task<ActionResult<File>> PostFile(File file)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            file.UserId = userId;
            _context.File.Add(file);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/File/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<File>> DeleteFile(int id)
        {
            var file = await _context.File.FindAsync(id);
            if (file == null)
            {
                return NotFound();
            }

            _context.File.Remove(file);
            await _context.SaveChangesAsync();

            return file;
        }

        private bool FileExists(int id)
        {
            return _context.File.Any(e => e.FileId == id);
        }
    }
}
