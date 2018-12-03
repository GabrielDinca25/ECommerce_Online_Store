using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Data;
using OnlineStore.Models.Product;

namespace OnlineStore.Controllers
{
    public class AdminController : Controller
    {

        private ApplicationDbContext db;
        public List<Product> products;

        public AdminController(ApplicationDbContext db)
        {
            this.db = db;
        }

        public void GetProducts()
        {
            products = db.Products.ToList();

            ViewBag.Products = products;
        }

        public IActionResult Admin()
        {
            GetProducts();
            return View();
        }
    }
}