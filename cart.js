const cartItemsDiv = document.getElementById("cartItems");
const totalEl = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
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

renderCart();
toggleCheckout();

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


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.qty || 1);
  }, 0);

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = totalItems;
}

updateCartCount();

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCheckout();
  updateCartCount(); // optional
}
document.querySelector(".checkout-btn")?.addEventListener("click", async () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const res = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total })
  });

  const order = await res.json();

  var options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: "INR",
    name: "Sharda Musical",
    order_id: order.id,
    handler: function (response) {
      alert("Payment Successful!");
      localStorage.removeItem("cart");
      window.location.reload();
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
