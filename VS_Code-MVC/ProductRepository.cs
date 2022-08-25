using Dapper;
using System.Data;
using VS_Code_MVC.Models;

namespace VS_Code_MVC
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDbConnection _conn;

        public ProductRepository(IDbConnection conn)
        {
            _conn = conn;
        }

        public IEnumerable<Product> GetAllEdibles()
        {
            return _conn.Query<Product>("SELECT * FROM PRODUCTS WHERE CategoryID = 1;");
        }
        public Product GetEdiblesProduct(int id)
        {
            return _conn.QuerySingle<Product>("SELECT * FROM PRODUCTS WHERE CATEGORYID = 3 AND PRODUCTID = @id", new { id = id });
        }
        public IEnumerable<Product> GetAllWax()
        {
            return _conn.Query<Product>("SELECT * FROM PRODUCTS WHERE CategoryID = 2;");
        }
        public Product GetWaxProduct(int id)
        {
            return _conn.QuerySingle<Product>("SELECT * FROM PRODUCTS WHERE CATEGORYID = 2 AND PRODUCTID = @id", new { id = id });
        }

        public IEnumerable<Product> GetAllFlower()
        {
            return _conn.Query<Product>("SELECT * FROM PRODUCTS WHERE CategoryID = 3;");
        }

       

        public Product GetFlowerProduct(int id)
        {
            return _conn.QuerySingle<Product>("SELECT * FROM PRODUCTS WHERE CATEGORYID = 3 AND PRODUCTID = @id", new { id = id });
        }

        public IEnumerable<Product> GetAllFeaturedProducts()
        {
            return _conn.Query<Product>("SELECT * FROM PRODUCTS WHERE FEATUREDPRODUCT = 1;");
        }
        
    }
}
