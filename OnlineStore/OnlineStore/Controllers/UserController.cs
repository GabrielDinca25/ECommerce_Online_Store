using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            try
            {
                string email = userToRegister[0]["value"].ToString();
                string password = userToRegister[2]["value"].ToString();

                User user = new User(email, password, "user");

                db.Users.Add(user);
                db.SaveChanges();

                return "Success";
            }
            catch(Microsoft.EntityFrameworkCore.DbUpdateException e)
            {
                return "User already exists";
            }
            catch (Exception e)
            {
                return "Something went wrong, please try again";
            }

        }

        [HttpPost]
        [ActionName("Login")]
        public String Login([FromBody] dynamic userToLogin)
        {
            string email = userToLogin[0]["value"].ToString();
            string password = userToLogin[1]["value"].ToString();

            var users = db.Users;

            foreach (var user in users)
            {
                if (user.Email.Equals(email))
                {
                    if (user.Password.Equals(password))
                    {
                        HttpContext.Session.SetString("email", email);
                        if (user.Rank == "admin")
                        {
                            HttpContext.Session.SetString("isAdmin", "True");
                        }
                        else
                        {
                            HttpContext.Session.SetString("isAdmin", "False");
                        }

                        return email;

                    }
                    else
                    {
                        return "Failure - Wrong password";
                    }
                }

            }

            return "Failure - Wrong email address";
        }
    }
}