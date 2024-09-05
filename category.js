const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate").content;
const categoryList = document.querySelector("#categoryList");
const params = new URLSearchParams(document.location.search);
const category = params.get("category");
let url = undefined;
if (params.has("category")) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
} else {
  url = "https://kea-alt-del.dk/t7/api/products";
}

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      categoryList.innerHTML += `<li><a href="kategori.html?category=${category.category}">${category.category}</a></li>`;
    });
  });

function duplicateTemplate(template, container) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const templateClone = template.cloneNode(true);

        templateClone.querySelector(".category").textContent = product.category;
        templateClone.querySelector(".price").textContent = product.price;
        templateClone.querySelector(".brand").textContent = product.brandname;
        templateClone.querySelector("#seemore").setAttribute("href", `produkt.html?productid=${product.id}`);
        templateClone.querySelector("img").setAttribute("src", `https://kea-alt-del.dk/t7/images/jpg/640/${product.id}.jpg`);
        if (product.soldout) {
          templateClone.querySelector("#soldoutLabel").classList.add("soldout");
        }

        container.appendChild(templateClone);
      });
    })
    .catch((error) => console.log(error));
}

duplicateTemplate(productTemplate, productContainer);
