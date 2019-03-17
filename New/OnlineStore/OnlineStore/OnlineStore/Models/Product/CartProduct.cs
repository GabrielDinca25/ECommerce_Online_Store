using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineStore.Models.Product
{
    public class CartProduct
    {
        public CartProduct() { }

        public CartProduct(string id, string prodId, string username, string name, string price, string image, string quantity)
        {
            Id = id;
            ProdId = prodId;
            Username = username;
            Name = name;
            Price = price;
            ImagePath = image;
            Quantity = quantity;
        }

        [Key]
        public String Id { get; set; }
        public String ProdId { get; set; }
        public String Username { get; set; }
        public String Name { get; set; }
        public String Price { get; set; }
        public String Quantity { get; set; }
        public String ImagePath { get; set; }
    }
}
