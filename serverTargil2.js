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
    res.send(filterArr);
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

    res.send("done");
  });
});
app.listen(8080);
