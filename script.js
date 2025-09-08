const loadCategoryBtn = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayLoadCategoryBtn(data.categories));
};
const displayLoadCategoryBtn = (CategoryBtns) => {
  const categoryBtn = document.getElementById("categoryBtn");
  categoryBtn.innerHTML = "";
  CategoryBtns.forEach((CategoryBtn) => {
    const div = document.createElement("div");
    div.innerHTML = ` <button id="${CategoryBtn.id}" class="font-semibold mt-2 cursor-pointer">${CategoryBtn.category_name}</button>`;
    categoryBtn.append(div);
  });

  categoryBtn.addEventListener("click", (e) => {
    const button = document.querySelectorAll("button");
    button.forEach((button) => {
      button.classList.remove("bg-green-500", "p-3", "rounded-lg");
    });
    if (e.target.localName == "button") {
      e.target.classList.add("bg-green-500", "p-3", "rounded-lg");
      loadCategoryPLant(e.target.id);
    }
  });
};

const loadCategoryPLant = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.plants);
      displayloadCategoryPLant(data.plants);
    });
};

//
const displayloadCategoryPLant = (categoryPLants) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  categoryPLants.forEach((categoryPLant) => {
    const div = document.createElement("div");
    div.className =
      "bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col items-center";

    div.innerHTML = `
      <img src="${categoryPLant.image}" alt="${categoryPLant.name}" 
           class="w-full h-40 object-cover rounded-lg mb-3"/>

      <h2 class="text-lg font-semibold mb-2">${categoryPLant.name}</h2>
      <p class="text-gray-600 text-sm mb-2 line-clamp-2">${categoryPLant.description}</p>
      <h4 class="text-sm text-gray-500 mb-1">Category: ${categoryPLant.category}</h4>
      <h4 class="text-green-600 font-bold mb-3">Price: ${categoryPLant.price}৳</h4>

      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
        Add to Cart
      </button>
    `;
    cardContainer.appendChild(div);
  });
};

loadCategoryPLant();
loadCategoryBtn();
