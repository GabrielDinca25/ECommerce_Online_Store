using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Models;

namespace OnlineStore.Controllers
{

    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private const string ControllerName = "User";
        private DatabaseContext db;

        public UserController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [ActionName("Register")]
        public String Register([FromBody] dynamic userToRegister)
        {
            return "Success";
        }


        [HttpGet]
        [ActionName("Login")]
        public String Login()
        {
            return "Muie Bogdan";
        }
    }
}