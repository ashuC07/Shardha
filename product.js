const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = PRODUCTS[id];

document.getElementById("productName").textContent = product.name;
document.getElementById("price").textContent = product.price;
document.getElementById("oldPrice").textContent = product.oldPrice;
document.getElementById("description").textContent = product.description;
document.getElementById("ratingText").textContent =
  `${product.rating} (${product.reviews} reviews)`;

// Images
const mainImage = document.getElementById("mainImage");
mainImage.src = product.images[0];

const thumbs = document.getElementById("thumbs");
product.images.forEach(img => {
  const i = document.createElement("img");
  i.src = img;
  i.onclick = () => mainImage.src = img;
  thumbs.appendChild(i);
});

// Colors
const colors = document.getElementById("colors");
product.colors.forEach(c => {
  const span = document.createElement("span");
  span.textContent = c;
  span.className = "color";
  colors.appendChild(span);
});

// Sizes
const sizes = document.getElementById("sizes");
product.sizes.forEach(s => {
  const opt = document.createElement("option");
  opt.textContent = s;
  sizes.appendChild(opt);
});

// Related
const related = document.getElementById("related");
product.related.forEach(id => {
  const p = PRODUCTS[id];
  related.innerHTML += `
    <div class="product">
      <img src="${p.images[0]}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
    </div>
  `;
});
