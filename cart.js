const cartItemsDiv = document.getElementById("cartItems");
const totalEl = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CART RENDER ================= */

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';
    totalEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₹${item.price.toLocaleString()}</p>

          <div class="qty-control">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  totalEl.textContent = total.toLocaleString();
}

/* ================= QUANTITY ================= */

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCheckout();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCheckout();
  updateCartCount();
}

/* ================= CHECKOUT BUTTON ================= */

function toggleCheckout() {
  const btn = document.querySelector(".checkout-btn");
  if (!btn) return;

  if (cart.length === 0) {
    btn.disabled = true;
    btn.classList.add("disabled");
  } else {
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
}

/* ================= CART BADGE ================= */

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.qty || 1);
  }, 0);

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = totalItems;
}

/* ================= CHECKOUT POPUP ================= */

document.querySelector(".checkout-btn").onclick = () => {
  document.getElementById("checkoutModal").style.display = "flex";
};

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("checkoutModal");
  const closeBtn = document.getElementById("closeModal");

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
  }

  // click outside modal
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
});

/* ================= FORM SUBMIT ================= */

// event delegation — always works with popup forms
document.addEventListener("submit", function(e) {

  if (e.target.id === "checkoutForm") {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    // collect user details
    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value
    };

    localStorage.setItem("customer", JSON.stringify(userData));

    // calculate total
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0
    );

    startPayment(total);
  }
});

/* ================= PAYMENT (PLACEHOLDER) ================= */

function startPayment(total) {

  var options = {
    key: "rzp_test_SHcldCTBTVpn1g", // ← replace with your Razorpay test key
    amount: total * 100, // rupees → paise
    currency: "INR",
    name: "Sharda Musical",
    description: "Order Payment",

    handler: function () {
      // payment success
      localStorage.removeItem("cart");
      window.location.href = "success.html";
    },

    modal: {
      ondismiss: function () {
        alert("Payment cancelled");
      }
    }
  };

  new Razorpay(options).open();
}


/* ================= INIT ================= */

renderCart();
toggleCheckout();
updateCartCount();
