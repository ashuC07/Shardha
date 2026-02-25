document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  e.target.reset();
});


//cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
  const badge = document.getElementById("cartCount");
  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 200);
}

updateCartCount();


document.querySelector(".cart-icon").onclick = () => {
  window.location.href = "cart.html";
};
