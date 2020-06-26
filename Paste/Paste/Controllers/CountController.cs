using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Paste.Models;

namespace Paste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountController : ControllerBase
    {
        private readonly DBContext _context;

        public CountController(DBContext context)
        {
            _context = context;
        }


        // GET: api/Count/5
        [Authorize]
        [HttpGet]
        public int GetFileCount()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return _context.File.Count(w => w.UserId == userId && (w.ExpirationDate > DateTime.Now || w.ExpirationDate == null));

        }

        [Authorize]
        [HttpGet]
        [Route("CountVersion")]
        public int GetVersionsCount(int fileid)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return _context.Version.Count(w => w.FileId == fileid);

        }
        [HttpGet]
        [Route("File")]
        public bool GetFileCount(string Name)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (_context.File.Count(w => w.Name == Name && w.UserId == userId) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }

        [HttpGet]
        [Route("Share")]
        public bool GetShareCount(int IdentityString)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (_context.Share.Count(w => w.FileId == IdentityString) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}