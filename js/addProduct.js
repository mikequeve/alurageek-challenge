import { conexionAPI } from "./conexionAPI.js";
const d = document;
const $form = document.querySelector("[data-form]");

async function addProduct(e) {
  e.preventDefault();

  const id = Math.floor(Math.random() * 100).toString();
  const $title = d.querySelector("[data-name]").value;
  const $img = d.querySelector("[data-img]").value;
  const $price = d.querySelector("[data-price]").value;

  try {
    await conexionAPI.addProduct(id, $title, $img, $price);
  } catch (error) {
    alert(`Error al agregar datos!! Error: ${error}`);
  }
}

$form.addEventListener("submit", (e) => addProduct(e));
