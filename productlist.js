window.addEventListener("DOMContentLoaded", hentData);

const url = `https://kea-alt-del.dk/t7/api/products?limit=15`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");

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
    kopi.querySelector("a").href = `product.html?id=${produkt.id}`;
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

/*
<article class="smallProduct">
                <img src="Billede_1.webp" alt="Fremhævet Bukser - Sondico">
                <div class="featured-info">
                    <h1>Sondico Bukser</h1>
                    <h3>Flotte bukser fra Sondico, designet til både komfort og stil.</h3>
                    <p class="pris">
                        <span>Tidligere:</span> DKK 1595,-
                    </p>
                    <p class="discount-price">Nu DKK 1400,- <span>-34%</span></p>
                    <a href="produkt.html" class="button">Køb nu</a>
                </div>
            </article>

{
  "id": 1163,
  "gender": "Men",
  "category": "Apparel",
  "subcategory": "Topwear",
  "articletype": "Tshirts",
  "season": "Summer",
  "productionyear": 2011,
  "usagetype": "Sports",
  "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
  "price": 895,
  "discount": null,
  "brandname": "Nike",
  "soldout": 0
}
*/
