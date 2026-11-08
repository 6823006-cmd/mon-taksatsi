import { addToCart } from "../services/cart.js";

const products = [
    {
        id: 1,
        name: "Нарс мод",
        price: 25000,
        stock: 30,
        image: "https://placehold.co/400x300?text=Nars"
    },
    {
        id: 2,
        name: "Гацуур мод",
        price: 45000,
        stock: 20,
        image: "https://placehold.co/400x300?text=Gatsuur"
    },
    {
        id: 3,
        name: "Хайлаас",
        price: 15000,
        stock: 50,
        image: "https://placehold.co/400x300?text=Khailaas"
    }
];

export function ProductsPage() {
    return `
        <section class="container">
            <h1 class="title">Мод, суулгацын бүтээгдэхүүн</h1>
            <p class="subtitle">Та хүссэн мод, суулгацаа сонгоорой.</p>

            <div class="columns is-multiline">
                ${products.map(product => `
                    <div class="column is-one-third">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="${product.image}" alt="${product.name}">
                                </figure>
                            </div>

                            <div class="card-content">
                                <h2 class="title is-5">${product.name}</h2>
                                <p>Үнэ: ${product.price.toLocaleString()} ₮</p>
                                <p>Үлдэгдэл: ${product.stock} ширхэг</p>

                                <button
                                    class="button is-success mt-3"
                                    data-product-id="${product.id}">
                                    <span class="icon">
                                        <i class="fa-solid fa-cart-plus"></i>
                                    </span>
                                    <span>Сагсанд нэмэх</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>
    `;
}

export function initProductsPage() {
    document.querySelectorAll("[data-product-id]").forEach(button => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.productId);
            const product = products.find(item => item.id === productId);

            if (product) {
                addToCart(product);
            }
        });
    });
}
