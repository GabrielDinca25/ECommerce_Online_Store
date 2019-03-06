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

        public Product(string id, string name, string price, string gender, string style, string description, string image, string quantity)
        {
            Id = id;
            Name = name;
            Price = price;
            Gender = gender;
            Style = style;
            Description = description;
            ImagePath = image;
            Quantity = quantity;
        }

        [Key]
        public String Id { get; set; }
        public String Name { get; set; }
        public String Price { get; set; }
        public String Gender { get; set; }
        public String Style { get; set; }
        public String Description { get; set; }
        public String Quantity { get; set; }
        public String ImagePath { get; set; }
    }
}
