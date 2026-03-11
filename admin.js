// Check if logged in
if (localStorage.getItem("admin_logged_in") !== "true") {
  window.location.href = "admin-login.html";
}

// Default products exactly matching the top of shop.js
const defaultProducts = [
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

// Load products from localStorage or use default
let currentProducts = JSON.parse(localStorage.getItem("shop_products"));

if (!currentProducts || currentProducts.length === 0) {
  currentProducts = [...defaultProducts];
  saveProducts();
}

const tableBody = document.getElementById("productTableBody");
const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");
const addProductBtn = document.getElementById("addProductBtn");
const resetProductsBtn = document.getElementById("resetProductsBtn");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");

function saveProducts() {
  localStorage.setItem("shop_products", JSON.stringify(currentProducts));
}

function renderTable() {
  tableBody.innerHTML = "";

  if (currentProducts.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No products found. Add one!</td></tr>`;
    return;
  }

  currentProducts.forEach((p, index) => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="${p.img}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td><span style="text-transform: capitalize;">${p.type}</span></td>
        <td>₹${Number(p.price).toLocaleString()}</td>
        <td class="action-btns">
          <button class="edit-btn" onclick="openModal(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function openModal(index = -1) {
  const fileInput = document.getElementById("prodImgFile");
  if (fileInput) fileInput.value = ""; // Reset file input

  // -1 means setting up for Add New, otherwise Edit Existing
  if (index === -1) {
    modalTitle.textContent = "Add Product";
    productForm.reset();
    document.getElementById("editIndex").value = "-1";
  } else {
    modalTitle.textContent = "Edit Product";
    const p = currentProducts[index];
    document.getElementById("prodName").value = p.name;
    document.getElementById("prodType").value = p.type;
    document.getElementById("prodPrice").value = p.price;
    document.getElementById("prodImg").value = p.img || "assets/logo.png";
    document.getElementById("editIndex").value = index;
  }

  modal.style.display = "block";
}

function deleteProduct(index) {
  if (confirm(`Are you sure you want to delete "${currentProducts[index].name}"?`)) {
    currentProducts.splice(index, 1);
    saveProducts();
    renderTable();
  }
}

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("prodName").value.trim();
  const type = document.getElementById("prodType").value;
  const price = document.getElementById("prodPrice").value;
  const index = parseInt(document.getElementById("editIndex").value, 10);
  const fileInput = document.getElementById("prodImgFile");
  let img = document.getElementById("prodImg").value.trim();

  // If a new file is uploaded, convert to Base64
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      img = event.target.result;
      processProductSave(name, type, price, img, index);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    if (!img) img = "assets/logo.png";
    processProductSave(name, type, price, img, index);
  }
});

function processProductSave(name, type, price, img, index) {
  const newProduct = {
    name: name,
    type: type,
    price: parseInt(price, 10),
    img: img
  };

  if (index === -1) {
    // Add new
    currentProducts.push(newProduct);
  } else {
    // Update existing
    currentProducts[index] = newProduct;
  }

  saveProducts();
  renderTable();
  modal.style.display = "none";
}

// Event Listeners
addProductBtn.addEventListener("click", () => openModal(-1));

resetProductsBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all products to the default list? This will erase any custom products.")) {
    currentProducts = [...defaultProducts];
    saveProducts();
    renderTable();
  }
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Logout listener
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("admin_logged_in");
  window.location.href = "admin-login.html";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Init
renderTable();
