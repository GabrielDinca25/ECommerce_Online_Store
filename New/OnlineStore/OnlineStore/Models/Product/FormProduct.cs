using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineStore.Models.Product
{
    public class FormProduct
    {
        public String Name { get; set; }
        public String Price { get; set; }
        public String ImagePath { get; set; }
        public Int32 Quantity { get; set; }
    }
}
