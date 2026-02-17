const products = [
  { name: "Professional Sitar", price: 12000, type: "string", img: "assets/g.png" },
  { name: "Premium Guitar", price: 17000, type: "string", img: "assets/g1.png" },
  { name: "Concert Tabla", price: 15000, type: "percussion", img: "assets/t.png" },
  { name: "Beginner Sitar", price: 10000, type: "string", img: "assets/15.png" },
  { name: "Advanced Tabla", price: 18000, type: "percussion", img: "assets/t.png" },
  { name: "Classic Sitar", price: 13000, type: "string", img: "assets/17.png" },
  { name: "Copper Tabla", price: 18500, type: "string", img: "assets/copper_tabla.jpg" },
  { name: "Brass Tabla set", price: 16500, type: "string", img: "assets/Brass_tabla.jpg" },
  { name: "Steel Tabla Set", price: 6500, type: "percussion", img: "assets/Steel_tabla.jpg" },
  { name: "Folding Harmonium", price: 19500, type: "string", img: "assets/folding_harmonium.jpg" },
  { name: "Guitar", price: 6500, type: "percussion", img: "assets/guitar.jpg" },
  { name: "Stranger Box", price: 13000, type: "string", img: "assets/stranger_box.webp" }
];

let visible = 6;

const grid = document.getElementById("productGrid");
const priceRange = document.getElementById("priceRange");
const priceVal = document.getElementById("priceVal");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const sort = document.getElementById("sort");
const count = document.getElementById("count");
const loadBtn = document.getElementById("loadMore");

function render() {
  let filtered = products.filter(p =>
    p.price <= priceRange.value &&
    [...checkboxes].some(c => c.checked && c.value === p.type)
  );

  if (sort.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort.value === "high") filtered.sort((a, b) => b.price - a.price);

  count.textContent =
    `Showing ${Math.min(visible, filtered.length)} of ${filtered.length}`;

  grid.innerHTML = "";

  filtered.slice(0, visible).forEach(p => {
    grid.innerHTML += `
  <div class="product">
    <img src="${p.img}">
    <h4>${p.name}</h4>
    <p class="price">₹${p.price.toLocaleString()}</p>

    <div class="product-actions">
      <button class="add-btn" onclick='addToCart(${JSON.stringify(p)})'>
        Add to Cart
      </button>
      <button class="checkout-btn" onclick="goToCheckout()">
        Checkout
      </button>
    </div>
  </div>
`;

  });

  // hide/show Load More
  loadBtn.style.display =
    visible >= filtered.length ? "none" : "block";
}

// Load more
loadBtn.onclick = () => {
  visible += 3;
  render();
};

// Reset on filters
priceRange.oninput = () => {
  priceVal.textContent = priceRange.value;
  visible = 6;
  render();
};

checkboxes.forEach(c => c.onchange = () => {
  visible = 6;
  render();
});

sort.onchange = () => {
  visible = 6;
  render();
};

// Initial render
render();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.onclick = () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  };
}


//button logic
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Added to cart");
  updateCartCount();
}


function goToCheckout() {
  window.location.href = "cart.html"; // cart.html
}


//toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


//cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.qty || 1);
  }, 0);

  document.getElementById("cartCount").textContent = totalItems;
}


updateCartCount();


document.querySelector(".cart-icon").onclick = () => {
  window.location.href = "cart.html";
};
