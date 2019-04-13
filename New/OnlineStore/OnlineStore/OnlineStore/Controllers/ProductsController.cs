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
        public String AddProduct([FromBody] dynamic productToAdd)
        {
            try
            {
                String id = Guid.NewGuid().ToString("N").Substring(0,7);
                String name = productToAdd[0]["value"].ToString();
                String price = productToAdd[1]["value"].ToString();
                String gender = productToAdd[2]["value"].ToString();
                String style = productToAdd[3]["value"].ToString();
                String description = productToAdd[4]["value"].ToString();
                String image = "/images/" + productToAdd[5]["value"].ToString();
                String quantity = productToAdd[6]["value"].ToString();

                Product product = new Product(id, name, price, gender, style, description, image, quantity);

                db.Products.Add(product);
                db.SaveChanges();

                return "Success";
            }
            catch(Exception e)
            {
                return "Failure" + e.ToString();
            }
        }

        [HttpPost]
        [ActionName("ReturnProducts")]
        public IEnumerable<Product> ReturnProducts([FromBody] String val)
        {
            var products = db.Products.ToList();
            return products.AsEnumerable();
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
        public String Edit([FromBody] dynamic updatedProduct)
        {
            {
                try
                {
                    String id = updatedProduct[0]["value"].ToString();
                    String newName = updatedProduct[1]["value"].ToString();
                    String newPrice = updatedProduct[2]["value"].ToString();
                    String newGender = updatedProduct[3]["value"].ToString();
                    String newStyle = updatedProduct[4]["value"].ToString();
                    String newDescription = updatedProduct[5]["value"].ToString();
                    String newImage = updatedProduct[6]["value"].ToString();
                    String newQuantity = updatedProduct[7]["value"].ToString();

                    var productToUpdate = db.Products.Where(p => p.Id.Equals(id)).FirstOrDefault();

                    if(productToUpdate != null)
                    {
                        productToUpdate.Name = newName;
                        productToUpdate.Price = newPrice;
                        productToUpdate.Gender = newGender;
                        productToUpdate.Style = newStyle;
                        productToUpdate.Description = newDescription;
                        productToUpdate.ImagePath = "";
                        productToUpdate.ImagePath = newImage;
                        productToUpdate.Quantity = newQuantity;

                        db.SaveChanges();
                    }

                    return "Success";
                }
                catch
                {
                    return "Failure";
                }
            }
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

        [HttpPost]
        [ActionName("Search")]
        public List<String> Search([FromBody]string t)
        {
            var names = db.Products.Select(p => p.Name).ToList();
            return names;
        }
    }
}
