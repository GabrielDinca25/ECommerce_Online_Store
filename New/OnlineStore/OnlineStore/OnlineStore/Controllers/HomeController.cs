using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Data;
using OnlineStore.Models;
using OnlineStore.Models.Product;

namespace OnlineStore.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext db;
        public List<Product> products;

        public HomeController(ApplicationDbContext db)
        {
            this.db = db;
        }

        public IActionResult Index()
        {
            GetProducts();
            return View();
        }

        public IActionResult Indexx()
        {
            return View();
        }


        [HttpPost]
        [Route("api/Home/DisplaySearchResults")]
        public IEnumerable<Product> DisplaySearchResults([FromBody]string searchTerm)
        {
            products = db.Products.Where(p => p.Name.ToLower().Contains(searchTerm.ToLower())).ToList();
            return products.AsEnumerable() ;
        }

        public void GetProducts()
        {
            products = db.Products.ToList();

            ViewBag.Products = products;
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
