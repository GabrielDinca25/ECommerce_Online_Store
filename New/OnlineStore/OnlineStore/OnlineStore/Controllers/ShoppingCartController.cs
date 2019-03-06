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