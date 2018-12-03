using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Data;
using OnlineStore.Models;
using OnlineStore.Models.Product;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineStore.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {
        private ApplicationDbContext db;

        public ProductsController(ApplicationDbContext db)
        {
            this.db = db;
        }

        // POST: Default/Create
        [HttpPost]
        [ActionName("AddProduct")]
        public ActionResult AddProduct([FromBody] dynamic productToAdd)
        {
            try
            {
                String id = Guid.NewGuid().ToString("N").Substring(0,7);
                String name = productToAdd[0]["value"].ToString();
                String price = productToAdd[1]["value"].ToString();
                String image = "~/images/" + productToAdd[2]["value"].ToString();
                String quantity = productToAdd[3]["value"].ToString();

                Product product = new Product(id, name, price, image, quantity);

                db.Products.Add(product);
                db.SaveChanges();

                return View();
            }
            catch
            {
                return View();
            }
        }

        [HttpGet]
        [ActionName("GetProducts")]
        public void GetProducts()
        {
            var products = db.Products.ToList();
           
            ViewBag.Products = products;
        }

        [HttpPost]
        [ActionName("Edit")]
        public ActionResult Edit([FromBody] dynamic productToEdit)
        {
            return View();
        }

        [HttpPost]
        [ActionName("Delete")]
        public String Delete([FromBody]string id)
        {
            var productToRemove = db.Products.Where(p => p.Id.Equals(id)).FirstOrDefault();

            try
            {
                db.Remove(productToRemove);
                db.SaveChanges();
            }
            catch(Exception e)
            {
                return "Failure";
            }

            return "Success";

        }
    }
}
