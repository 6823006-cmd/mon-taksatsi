
import { HomePage } from "./pages/home.js";
import { ProductsPage, initProductsPage } from "./pages/products.js";
import { CartPage, initCartPage } from "./pages/cart.js";

const routes = {
    "/": HomePage,
    "/products": ProductsPage,
    "/about": () => "<h1>Бидний тухай</h1>",
    "/care": () => "<h1>Арчилгааны зөвлөмж</h1>",
    "/cart": CartPage
};
function router() {
    const app = document.getElementById("app");
    const path = window.location.hash.slice(1) || "/";
    const page = routes[path];

    if (!app) {
        console.error("id='app' элемент олдсонгүй!");
        return;
    }

    app.innerHTML = page
        ? page()
        : "<h1 class='title'>404 - Хуудас олдсонгүй</h1>";

    if (path === "/products") {
        initProductsPage();
    }

    if (path === "/cart") {
        initCartPage();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
