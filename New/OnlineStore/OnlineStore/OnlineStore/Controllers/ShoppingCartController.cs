using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Data;
using OnlineStore.Models.Product;
using System.Security.Claims;
using OnlineStore.Models;
using Microsoft.AspNetCore.Identity;

namespace OnlineStore.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ShoppingCartController : Controller
    {
        private ApplicationDbContext db;
        public List<CartProduct> products;

        public ShoppingCartController(ApplicationDbContext db)
        {
            this.db = db;
        }

        public IActionResult ShoppingCart()
        {
            GetProducts();
            return View();
        }

        [HttpPost]
        [ActionName("AddToCart")]
        public String AddToCart([FromBody]string productId)
        {
            try
            {
                var signedInUser = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var productToAdd = db.Products.Where(p => p.Id.Equals(productId)).FirstOrDefault();

                CartProduct newCartProduct = new CartProduct(Guid.NewGuid().ToString("N").Substring(0, 7), signedInUser, productToAdd.Name, productToAdd.Price, productToAdd.ImagePath, productToAdd.Quantity);

                db.CartProducts.Add(newCartProduct);
                db.SaveChanges();

                return "Success";
            }
            catch(Exception e)
            {
                return "Failure " + e.ToString();
            }

        }

        [HttpPost]
        [ActionName("DeleteAllProducts")]
        public String DeleteAllProducts([FromBody] String val)
        {
            try
            {
                var signedInUser = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
                db.CartProducts.RemoveRange(db.CartProducts.Where(x => x.Username == signedInUser));
                db.SaveChanges();

                return "Order was placed!";
            }
            catch(Exception e)
            {
                return "Failure" + e;
            }
        }

        [HttpPost]
        [ActionName("DeleteProduct")]
        public String DeleteProduct([FromBody] String productId)
        {
            var productToRemove = db.CartProducts.Where(p => p.Id.Equals(productId)).FirstOrDefault();

            try
            {
                db.CartProducts.Remove(productToRemove);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return "Failure";
            }

            return "Success";
        }

        public void GetProducts()
        {
            var signedInUser = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            products = db.CartProducts.Where(p => p.Username.Equals(signedInUser)).ToList();

            Int32 totalPrice = 0;
            Int32 size = 0;
            foreach(CartProduct product in products)
            {
                totalPrice += Int32.Parse(product.Price);
                size++;
            }

            ViewBag.Total = totalPrice;
            ViewBag.ProductsNumber = size;
            ViewBag.Products = products;
        }

    }

}