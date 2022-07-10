import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const Product = mongoose.model("Product", { title: String, price: Number });

app.get("/products", (req, res) => {
  const { title } = req.query;
  Product.find().then((products) => {
    const filteredProduct = title
      ? products.filter((product) =>
          product.title.toLowerCase().includes(title.toLowerCase())
        )
      : products;

    res.send(filteredProduct);
  });
});
app.get("/products", (req, res) => {
  Product.find().then((products) => {
    res.send(products);
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Product.findById(id)
    .then((product) => {
      res.send(product);
    })
    .catch((e) => res.send("Not found"));
});

app.post("/products", (req, res) => {
  const { title, price } = req.body;
  Product.insertMany([
    {
      title,
      price,
    },
  ]).then((products) => {
    res.send(products);
  });
});

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body)
    .then((todos) => res.send(todos))
    .catch((e) => res.send("Not found"));
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((todo) => res.send(todo))
    .catch((e) => res.send("Not found"));
});

mongoose.connect("mongodb://localhost:27017/gocode-shop-5-22").then(() => {
  app.listen(8080);
});
