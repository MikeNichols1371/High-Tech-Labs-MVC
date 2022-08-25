using Microsoft.AspNetCore.Mvc;

namespace VS_Code_MVC.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _repo;
        public ProductController(IProductRepository repo)
        {
            _repo = repo;
        }
        public IActionResult Flower()
        {
            var flower = _repo.GetAllFlower();
            return View(flower);
        }
        public IActionResult Wax()
        {
            var wax = _repo.GetAllWax();
            return View(wax);
        }
        public IActionResult Edibles()
        {
            var edibles = _repo.GetAllEdibles();
            return View(edibles);
        }
        public IActionResult Index()
        {
            var featuredProducts = _repo.GetAllFeaturedProducts();
            return View(featuredProducts);
        }
    }

}
