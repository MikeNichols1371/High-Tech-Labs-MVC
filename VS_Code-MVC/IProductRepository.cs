using VS_Code_MVC.Models;

namespace VS_Code_MVC
{
    public interface IProductRepository
    {
        public IEnumerable<Product> GetAllEdibles();

        public Product GetEdiblesProduct(int id);
        public IEnumerable<Product> GetAllWax();
        public Product GetWaxProduct(int id);

        public IEnumerable<Product> GetAllFlower();
        public Product GetFlowerProduct(int id);
        public IEnumerable<Product> GetAllFeaturedProducts();
        
    }
}
