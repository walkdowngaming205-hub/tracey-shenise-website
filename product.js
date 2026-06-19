// =====================================
// TRACEY SHENISE — PRODUCT PAGE
// Reads product ID from URL
// Example: product.html?id=bundle1
// =====================================

// Fake cart count
const cartCountEl = document.getElementById("cartCount");
let cartCount = 0;

// Page elements
const productImage = document.getElementById("productImage");
const productType = document.getElementById("productType");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");

const addToCartBtn = document.getElementById("addToCartBtn");

// Products database (edit these whenever you want)
const products = {
  bundle1: {
    type: "BUNDLES",
    title: "Brazilian Straight",
    price: "$89.00",
    desc: "Soft, full, and true-to-length. Perfect for sleek installs and luxury looks.",
    image: "images/bundle.jpg",
  },
  bundle2: {
    type: "BUNDLES",
    title: "Body Wave",
    price: "$95.00",
    desc: "Luxury wave pattern that holds curls and stays full with minimal shedding.",
    image: "images/bundle.jpg",
  },
  closure1: {
    type: "CLOSURES",
    title: "HD Lace Closure",
    price: "$79.00",
    desc: "Melted hairline, clean parts, and a flawless natural finish.",
    image: "images/closure.jpg",
  },
  closure2: {
    type: "CLOSURES",
    title: "Transparent Lace",
    price: "$85.00",
    desc: "Perfect blend with HD finish for the most natural install look.",
    image: "images/closure.jpg",
  },
  wig1: {
    type: "WIGS",
    title: "Glueless Wig",
    price: "$199.00",
    desc: "Ready to wear luxury wig. Comfortable fit, natural hairline, effortless look.",
    image: "images/wig.jpg",
  },
  wig2: {
    type: "WIGS",
    title: "HD Lace Wig",
    price: "$249.00",
    desc: "Full luxury wig with HD lace. Melted hairline and premium density.",
    image: "images/wig.jpg",
  },
};

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load product
if (id && products[id]) {
  const p = products[id];

  productType.textContent = p.type;
  productTitle.textContent = p.title;
  productPrice.textContent = p.price;
  productDesc.textContent = p.desc;

  productImage.src = p.image;
  productImage.alt = p.title;

  document.title = `${p.title} | Tracey Shenise`;
} else {
  // fallback
  productTitle.textContent = "Product Not Found";
  productDesc.textContent =
    "This product does not exist. Please go back to the shop.";
}

// Add to cart button
addToCartBtn.addEventListener("click", () => {
  cartCount++;
  cartCountEl.textContent = cartCount;
});
