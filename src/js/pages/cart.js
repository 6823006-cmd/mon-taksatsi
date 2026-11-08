
import {
    getCart,
    updateCartQuantity,
    removeFromCart
} from "../services/cart.js";

export function CartPage() {
    const cart = getCart();

    if (cart.length === 0) {
        return `
            <div class="container">
                <h1 class="title">Миний сагс</h1>
                <p>Таны сагс одоогоор хоосон байна.</p>
                <a href="#/products" class="button is-success mt-4">
                    Бүтээгдэхүүн үзэх
                </a>
            </div>
        `;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return `
        <div class="container">
            <h1 class="title">Миний сагс</h1>

            <div class="table-container">
                <table class="table is-fullwidth is-striped">
                    <thead>
                        <tr>
                            <th>Бүтээгдэхүүн</th>
                            <th>Үнэ</th>
                            <th>Тоо ширхэг</th>
                            <th>Нийт</th>
                            <th>Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.price.toLocaleString()} ₮</td>
                                <td>
                                    <button class="button is-small"
                                        data-action="decrease"
                                        data-id="${item.id}">−</button>

                                    <span class="mx-3">${item.quantity}</span>

                                    <button class="button is-small"
                                        data-action="increase"
                                        data-id="${item.id}">+</button>
                                </td>
                                <td>
                                    ${(item.price * item.quantity).toLocaleString()} ₮
                                </td>
                                <td>
                                    <button class="button is-danger is-light is-small"
                                        data-action="remove"
                                        data-id="${item.id}">
                                        Устгах
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>

            <h2 class="title is-4 has-text-right">
                Нийт төлбөр: ${total.toLocaleString()} ₮
            </h2>

            <div class="has-text-right">
                <button class="button is-success" disabled>
                    Захиалга баталгаажуулах
                </button>
            </div>
        </div>
    `;
}

export function initCartPage() {
    document.querySelectorAll("[data-action]").forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const action = button.dataset.action;

            if (action === "increase") {
                updateCartQuantity(id, 1);
            } else if (action === "decrease") {
                updateCartQuantity(id, -1);
            } else if (action === "remove") {
                removeFromCart(id);
            }

            document.getElementById("app").innerHTML = CartPage();
            initCartPage();
        });
    });
}
