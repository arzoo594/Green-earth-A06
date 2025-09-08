let cart = [];

const renderCart = () => {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-green-50 p-2 rounded";
    div.innerHTML = `
      <span>${item.name} - ${item.price}৳</span>
      <span class="cursor-pointer text-red-500 font-bold" onclick="removeCartItem(${index})">❌</span>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `৳${total}`;
};

const addToCart = (product) => {
  cart.push(product);
  renderCart();
};

const removeCartItem = (index) => {
  cart.splice(index, 1);
  renderCart();
};

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const closeModal = document.getElementById("closeModal");

const openModal = (plant) => {
  modalImage.src = plant.image;
  modalName.textContent = plant.name;
  modalDescription.textContent = plant.description;
  modalCategory.textContent = `Category: ${plant.category}`;
  modalPrice.textContent = `Price: ${plant.price}৳`;
  modal.classList.remove("hidden");
};

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

const displayPlants = (plants) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.className =
      "bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col items-center";

    div.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-lg mb-3"/>
      <h2 class="text-lg font-semibold mb-2 cursor-pointer text-blue-600 hover:underline name-click">${plant.name}</h2>
      <p class="text-gray-600 text-sm mb-2 line-clamp-2">${plant.description}</p>
      <h4 class="text-sm text-green-500 mb-1 bg-[#DCFCE7] rounded-lg p-1">${plant.category}</h4>
      <h4 class="text-green-600 font-bold mb-3">Price: ${plant.price}৳</h4>
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full">Add to Cart</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart({ name: plant.name, price: plant.price });
      alert(`"${plant.name}" has been added to the cart!`);
    });

    div.querySelector(".name-click").addEventListener("click", () => {
      openModal(plant);
    });

    cardContainer.appendChild(div);
  });
};

const displayCategoryBtn = (categories) => {
  const categoryContainer = document.querySelector("#categoryBtn > div");
  categoryContainer.innerHTML = "";

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      "font-semibold mt-2 w-full text-left p-2 rounded hover:bg-green-100";
    btn.textContent = category.category_name;

    btn.addEventListener("click", () => {
      loadCategoryPLant(category.id);
    });

    categoryContainer.appendChild(btn);
  });

  categoryContainer.addEventListener("click", (e) => {
    const btns = categoryContainer.querySelectorAll("button");
    btns.forEach((button) => button.classList.remove("bg-green-400"));
    if (e.target.localName === "button") {
      e.target.classList.add("bg-green-400");
    }
  });
};

const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants))
    .catch((err) => console.error("Error loading plants:", err));
};

const loadCategoryBtn = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryBtn(data.categories))
    .catch((err) => console.error("Error loading categories:", err));
};

const loadCategoryPLant = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants))
    .catch((err) => console.error("Error loading category plants:", err));
};

loadAllPlants();
loadCategoryBtn();
