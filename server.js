const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/products", (req, res) => {
  const { title } = req.query;
  fs.readFile("products.json", "utf8", (req, resFile) => {
    const productsArr = JSON.parse(resFile);
    if (title) {
      const filterArr = productsArr.filter((product) =>
        product.title.includes(title)
      );
      console.log(filterArr);
      res.send(filterArr ? filterArr : "no");
    } else {
      res.send(productsArr);
    }
  });
});
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("products.json", "utf8", (req, resFile) => {
    const product = JSON.parse(resFile).find((product) => product.id === +id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      res.send();
    }
  });
});
app.post("/products", (req, res) => {
  const title = {
    id: 22,
    title: req.body.title,
    price: 125,
    description: "Your perfect pack for everyday usy",
    categor: "mens clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  };
  let productsArr;
  fs.readFile("products.json", "utf8", (err, resFile) => {
    productsArr = JSON.parse(resFile);
    productsArr.push(title);
    fs.writeFile("products.json", JSON.stringify(productsArr), (err) => {
      res.send("success");
    });
  });
});
app.put("/products/:id", (req, res) => {
  const { title, completed = false } = req.body;
  const { id } = req.params;
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    const updateArr = productsArr.map((product) => {
      if (product.id === +id) {
        return {
          ...product,
          completed,
          title,
        };
      } else {
        return { ...product };
      }
    });
    fs.writeFile("products.json", JSON.stringify(updateArr), (err) => {
      res.send("success");
    });
  });
});
app.delete("/products/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    const { id } = req.params;
    const productsArr = JSON.parse(products);
    const updateArr = productsArr.filter((product) => product.id !== +id);
    fs.writeFile("products.json", JSON.stringify(updateArr), (err) => {
      res.send("success");
    });
  });
});

app.listen(8080);
