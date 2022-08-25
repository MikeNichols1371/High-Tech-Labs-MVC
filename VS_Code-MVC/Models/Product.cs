namespace VS_Code_MVC.Models
{
    public class Product
    {
        public Product()
        {

        }

        public int ProductID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int FeaturedProduct { get; set; }
        public int CategoryID { get; set; }
        public int StockLevel { get; set; }
        public string ProductImage { get; set; }
        public string ProductDescription { get; set; }




    }
}
