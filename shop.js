const products = [
  { name: "Professional Sitar", price: 12000, type: "string", img: "g.png" },
  { name: "Premium Guitar", price: 17000, type: "string", img: "g1.png" },
  { name: "Concert Tabla", price: 15000, type: "percussion", img: "t.png" },
  { name: "Beginner Sitar", price: 10000, type: "string", img: "15.png" },
  { name: "Advanced Tabla", price: 18000, type: "percussion", img: "t.png" },
  { name: "Classic Sitar", price: 13000, type: "string", img: "17.png" }
];

let visible = 4;

const grid = document.getElementById("productGrid");
const priceRange = document.getElementById("priceRange");
const priceVal = document.getElementById("priceVal");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const sort = document.getElementById("sort");
const count = document.getElementById("count");

function render() {
  let filtered = products.filter(p =>
    p.price <= priceRange.value &&
    [...checkboxes].some(c => c.checked && c.value === p.type)
  );

  if (sort.value === "low") filtered.sort((a,b)=>a.price-b.price);
  if (sort.value === "high") filtered.sort((a,b)=>b.price-a.price);

  count.textContent = `Showing ${Math.min(visible, filtered.length)} of ${filtered.length}`;

  grid.innerHTML = "";
  filtered.slice(0, visible).forEach(p => {
    grid.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p class="price">₹${p.price.toLocaleString()}</p>
      </div>
    `;
  });
}

priceRange.oninput = () => {
  priceVal.textContent = priceRange.value;
  render();
};

checkboxes.forEach(c => c.onchange = render);
sort.onchange = render;

document.getElementById("loadMore").onclick = () => {
  visible += 3;
  render();
};

render();
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.onclick = () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
};
