import { conexionAPI } from "./conexionAPI.js";

const list = document.querySelector("[data-product-list]"),
  $productMessage = document.querySelector(".no__product-title");

export default function productCard(id, title, urlImg, price) {
  const product = document.createElement("figure");
  product.className = "product__card";
  product.innerHTML = `
    <img src="${urlImg}" alt="${title}" class="product__card-img"/>
    <figcaption>
      <p class="product__card-title">${title}</p>
      <aside class="product__card-value">
        <p class="product__card-value-price">$${price}.00</p>
        <img src="../trash-icon.png" class="product__card-value-delete" data-id="${id}"/>
      </aside>
    </figcaption>
  `;

  // Mostrar mensaje si no hay productos agregados
  if (product.innerHTML != "") {
    $productMessage.style.display = "none";
  } else {
    $productMessage.style.display = "block";
  }

  return product;
}

async function showProducts() {
  try {
    const listAPI = await conexionAPI.productList();

    listAPI.forEach((product) => {
      list.appendChild(
        productCard(product.id, product.title, product.urlImg, product.price)
      );
    });
  } catch (error) {
    list.innerHTML = "<h2>Ha ocurrido un problema con la conexion :(</h2>";
  }
}

showProducts();

document.addEventListener("click", (e) => {
  if (e.target.matches(".product__card-value-delete")) {
    let $id = document
      .querySelector(".product__card-value-delete")
      .getAttribute("data-id");
    conexionAPI.deleteProduct($id);
  }
});
