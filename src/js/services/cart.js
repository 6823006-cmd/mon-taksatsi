
const CART_KEY = "mon_taksatsi_cart";

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        if (existing.quantity >= product.stock) {
            alert("Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна.");
            return;
        }
        existing.quantity++;
    } else {
        if (product.stock <= 0) {
            alert("Бүтээгдэхүүн дууссан байна.");
            return;
        }
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    alert(product.name + " сагсанд нэмэгдлээ!");
}

export function updateCartQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity > item.stock) {
        alert("Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна.");
        return;
    }

    if (newQuantity <= 0) {
        const updatedCart = cart.filter(
            product => product.id !== productId
        );

        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } else {
        item.quantity = newQuantity;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
}

export function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        product => product.id !== productId
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
}
