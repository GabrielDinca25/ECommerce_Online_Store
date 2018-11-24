using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineStore.Models.Product
{
    public class Product
    {
        public Product() { }

        public Product(string id, string name, string price, string image, string quantity)
        {
            Id = id;
            Name = name;
            Price = price;
            ImagePath = image;
            Quantity = quantity;
        }

        [Key]
        public String Id { get; set; }
        public String Name { get; set; }
        public String Price { get; set; }
        public String Quantity { get; set; }
        public String ImagePath { get; set; }
    }
}
