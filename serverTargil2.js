const express = require("express");
const fsp = require("fs/promises");
const app = express();

app.use(express.json());
function getMaxNum(arr) {
  const ids = arr.map((obj) => obj.id);
  const max = Math.max(...ids);
  return max;
}

app.get("/products", (req, res) => {
  fsp.readFile("products.json", "utf-8").then((data) => {
    const productArr = JSON.parse(data);
    res.send(productArr);
  });
});
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  fsp.readFile("products.json", "utf-8").then((data) => {
    const productArr = JSON.parse(data);
    const filterArr = productArr.find((product) => product.id === +id);
    filterArr ? res.send(filterArr) : res.send("not found");
  });
});
app.post("/products", (req, res) => {
  const { title, categort, price } = req.body;
  fsp.readFile("products.json", "utf-8").then((data) => {
    const productArr = JSON.parse(data);
    productArr.push({
      id: getMaxNum(productArr) + 1,
      title,
      price,
      categort,
    });
    fsp
      .writeFile("products.json", JSON.stringify(productArr))
      .then(() => {
        res.send("success");
      })
      .catch((err) => res.send("not delete"));
  });
});
app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  if (id && req.body) {
    fsp.readFile("products.json", "utf-8").then((data) => {
      const productArr = JSON.parse(data);
      const updateArr = productArr.map((product) =>
        product.id === +id ? { ...product, ...req.body } : product
      );
      console.log(updateArr);
      fsp
        .writeFile("products.json", JSON.stringify(updateArr))
        .then(() => {
          res.send("success");
        })
        .catch((err) => console.log(err));
    });
  }
});
app.delete("/products/:id", (req, res) => {
  fsp.readFile("products.json", "utf-8").then((data) => {
    const { id } = req.params;
    const productsArr = JSON.parse(data);
    const updateArr = productsArr.filter((product) => product.id !== +id);
    fsp
      .writeFile("products.json", JSON.stringify(updateArr))
      .then(() => {
        res.send("success");
      })
      .catch((err) => res.send("not delete"));
  });
});
app.listen(8080);
