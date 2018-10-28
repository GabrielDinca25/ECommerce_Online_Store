using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineStore.Models
{
    public class User
    {
        [Key]
        public String Email { get; set; }
        public String Password { get; set; }

        public User() { }

        public User(String email, String password)
        {
            Email = email;
            Password = password;
        }
    }
}
