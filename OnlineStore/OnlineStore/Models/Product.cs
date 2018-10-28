using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineStore.Models
{
    public class Product
    {
        [Key]
        public String Id { get; set; }
        public String Name { get; set; }
        public String Price { get; set; }
        public String Quantity { get; set; }
    }
}
