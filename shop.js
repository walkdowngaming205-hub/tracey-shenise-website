/* =========================================================
   TRACEY SHENISE — SHOP PAGE JS
   - Filters
   - Add to cart
   - Cart bubble count
   - Saves to localStorage
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

/* ---------- ADD TO CART ---------- */
function addToCart(product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      qty: 1,
    });
  }

  saveCart(cart);
  updateCartBubble();

  // little luxury confirmation
  showToast(`${product.title} added to cart`);
}

/* ---------- TOAST ---------- */
function showToast(message) {
  let toast = document.querySelector(".tsToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "tsToast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* ---------- FILTERS ---------- */
function setupFilters() {
  const filterBtns = document.querySelectorAll(".shopFilters__btn");
  const items = document.querySelectorAll(".shopItem");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // active class
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const type = item.dataset.type;

        if (filter === "all") {
          item.style.display = "flex";
        } else {
          item.style.display = type === filter ? "flex" : "none";
        }
      });
    });
  });
}

/* ---------- BUTTON EVENTS ---------- */
function setupAddButtons() {
  const addBtns = document.querySelectorAll("[data-add]");

  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: btn.dataset.price,
        image: btn.dataset.image,
      };

      addToCart(product);
    });
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBubble();
  setupFilters();
  setupAddButtons();
});
