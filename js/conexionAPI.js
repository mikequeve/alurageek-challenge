const url = "http://localhost:3000/products";

async function productList() {
  const conection = await fetch(url);
  const convertedConection = await conection.json();

  return convertedConection;
}

async function addProduct(id, title, urlImg, price) {
  const conection = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id: id,
      title: title,
      urlImg: urlImg,
      price: price,
    }),
  });

  const convertedConection = conection.json();

  if (!conection.ok) {
    throw new Error("Ha ocurrido un error al enviar el producto");
  }

  return convertedConection;
}

async function deleteProduct(id) {
  const conection = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });

  const convertedConection = conection.json();

  if (!conection.ok) {
    throw new Error(
      "Problema de conexion, no se ha podido eliminar el producto."
    );
  }

  return convertedConection;
}

export const conexionAPI = {
  productList,
  addProduct,
  deleteProduct,
};
