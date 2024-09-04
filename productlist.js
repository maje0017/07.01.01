const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  //Looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  //Fang template
  const template = document.querySelector("#smallProductTemplate").content;
  //Lav en kopi
  const copy = template.cloneNode(true);
  //ændre indhold
  copy.querySelector("h3").textContent = product.productdisplayname;
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  // appende
  document.querySelector("main").appendChild(copy);
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
