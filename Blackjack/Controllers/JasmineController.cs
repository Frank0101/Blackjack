using System;
using System.Web.Mvc;

namespace Blackjack.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
