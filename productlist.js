window.addEventListener("DOMContentLoaded", hentData);

const url = `https://kea-alt-del.dk/t7/api/products?limit=15`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");

const params = new URLSearchParams(document.location.search);
const category = params.get("category");

if (params.has("category")) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
} else {
  url = "https://kea-alt-del.dk/t7/api/products";
}

function hentData() {
  fetch(url)
    .then((res) => res.json())
    .then((produkter) => visProdukter(produkter));
}

function visProdukter(produkter) {
  produkter.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true);
    kopi.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
    kopi.querySelector("img").alt = produkt.productdisplayname;
    kopi.querySelector("h3").textContent = produkt.productdisplayname;
    kopi.querySelector(".price span").textContent = produkt.price;
    kopi.querySelector("a").href = `produkt.html?id=${produkt.id}`;
    if (produkt.soldout) {
      kopi.querySelector("article").classList.add("soldOut");
    }
    if (produkt.discount) {
      kopi.querySelector("article").classList.add("onSale");
      kopi.querySelector(".discounted p span").textContent = Math.round(produkt.price - (produkt.price * produkt.discount) / 100);
      kopi.querySelector(".discounted p+p span").textContent = produkt.discount;
    }

    container.appendChild(kopi);
  });
}
