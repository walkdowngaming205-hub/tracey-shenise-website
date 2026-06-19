/* =========================================================
   TRACEY SHENISE — CART PAGE JS
   Reads same localStorage key as shop.js
   ========================================================= */

const CART_KEY = "ts_cart";

/* ---------- CART HELPERS ---------- */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBubble() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const bubble = document.getElementById("cartCount");
  if (bubble) bubble.textContent = totalQty;
}

/* ---------- MONEY ---------- */
function formatMoney(num) {
  return `$${Number(num).toFixed(2)}`;
}

/* ---------- RENDER ---------- */
function renderCart() {
  const cart = getCart();

  const wrap = document.getElementById("cartItemsWrap");
  const empty = document.getElementById("cartEmpty");

  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");

  wrap.innerHTML = "";

  // EMPTY CART
  if (!cart.length) {
    empty.style.display = "block";
    subtotalEl.textContent = "$0";
    shippingEl.textContent = "$0";
    totalEl.textContent = "$0";
    updateCartBubble();
    return;
  }

  empty.style.display = "none";

  // RENDER ITEMS
  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cartItem";

    row.innerHTML = `
      <img class="cartItem__img" src="${item.image}" alt="${item.title}" />

      <div class="cartItem__info">
        <h3 class="cartItem__title">${item.title}</h3>
        <p class="cartItem__price">${formatMoney(item.price)}</p>

        <div class="cartItem__controls">
          <button class="qtyBtn" data-dec="${item.id}">−</button>
          <span class="qtyNum">${item.qty}</span>
          <button class="qtyBtn" data-inc="${item.id}">+</button>

          <button class="removeBtn" data-remove="${item.id}">
            Remove
          </button>
        </div>
      </div>

      <div class="cartItem__total">
        ${formatMoney(item.price * item.qty)}
      </div>
    `;

    wrap.appendChild(row);
  });

  // TOTALS
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // simple shipping rule
  const shipping = subtotal > 0 ? 12.0 : 0;

  const total = subtotal + shipping;

  subtotalEl.textContent = formatMoney(subtotal);
  shippingEl.textContent = formatMoney(shipping);
  totalEl.textContent = formatMoney(total);

  updateCartBubble();
}

/* ---------- ACTIONS ---------- */
function incItem(id) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty += 1;
  saveCart(cart);
  renderCart();
}

function decItem(id) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty -= 1;

  if (item.qty <= 0) {
    const next = cart.filter((x) => x.id !== id);
    saveCart(next);
  } else {
    saveCart(cart);
  }

  renderCart();
}

function removeItem(id) {
  const cart = getCart();
  const next = cart.filter((x) => x.id !== id);
  saveCart(next);
  renderCart();
}

/* ---------- CLICK HANDLER ---------- */
document.addEventListener("click", (e) => {
  const inc = e.target.getAttribute("data-inc");
  const dec = e.target.getAttribute("data-dec");
  const rem = e.target.getAttribute("data-remove");

  if (inc) incItem(inc);
  if (dec) decItem(dec);
  if (rem) removeItem(rem);
});

/* ---------- CHECKOUT BUTTONS ---------- */
function setupCheckoutButtons() {
  const card = document.getElementById("checkoutCard");
  const cashapp = document.getElementById("checkoutCashapp");
  const apple = document.getElementById("checkoutApple");

  function fakeCheckout(type) {
    const cart = getCart();
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Checkout (${type}) coming next. Stripe will be connected later.`);
  }

  card.addEventListener("click", () => fakeCheckout("Card"));
  cashapp.addEventListener("click", () => fakeCheckout("CashApp"));
  apple.addEventListener("click", () => fakeCheckout("Apple Pay"));
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCheckoutButtons();
});
