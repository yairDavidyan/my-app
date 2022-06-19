import Header from "../components/header/header";
import Products from "../components/products/Products";
import { useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import Cart from "../components/cart/Cart";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductData } from "../interfaces/product";
import { isArray, max, min } from "lodash";

function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [localProducts, setLocalProducts] = useState<ProductData[]>([]);
  const [showCart, setShowCart] = useState<Boolean>(false);
  const [minMax, setMinMax] = useState<number[] | number>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLocalProducts(data);
        findMinMaxPrice(data);
        setCategory(data);
      });
  }, []);

  function setCategory(products) {
    if (localProducts) {
      let categories = products
        .map((product) => product.category)
        .filter((value, index, category) => category.indexOf(value) === index);
      setCategories(categories);
    }
  }

  function findMinMaxPrice(products: ProductData[]) {
    const prices = products?.map((product) => product.price);
    const minPrice = min(prices);
    const maxPrice = max(prices);
    if (minPrice && maxPrice) {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setMinMax([minPrice, maxPrice]);
    }
  }
  function addToCart(id: number) {
    const addToCart = [
      ...cart,
      localProducts.find((product) => {
        return product.id === id;
      }),
    ] as ProductData[];
    console.log("sd");

    setCart(addToCart);
  }

  function filter() {
    if (isArray(minMax)) {
      const filterProducts = localProducts.filter(
        (product) => product.price < minMax[1] && product.price > minMax[0]
      );
      setProducts(filterProducts);
    }
  }
  function categotyFilter(category) {
    let newProducts =
      category === "All"
        ? localProducts
        : localProducts.filter((product) => category === product.category);
    console.log(newProducts);
    setProducts(newProducts);
  }
  return (
    <>
      <ProductContext.Provider value={{ filter, cart, addToCart }}>
        <nav>
          <Link to="/about">About</Link>
        </nav>
        <Header categories={categories} filterByCategory={categotyFilter} />
        <Button onClick={() => setShowCart(true)}>Open Cart </Button>
        {showCart && <Cart setShowCart={setShowCart} />}
        <Products
          products={products}
          minMax={minMax}
          min={minPrice}
          max={maxPrice}
          setMinMax={setMinMax}
        />
      </ProductContext.Provider>
    </>
  );
}

export default Home;
