import Header from "../components/header/header";
import Products from "../components/products/Products";
import { useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import Cart from "../components/Cart";
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
  useEffect(() => {
    fetch(`https://bedecked-stone-turret.glitch.me/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLocalProducts(data);
        findMinMaxPrice(data);
      });
  }, []);
  if (localProducts) {
    let categories = localProducts
      .map((product) => product.category)
      .filter((value, index, category) => category.indexOf(value) === index);
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

  function filter() {
    if (isArray(minMax)) {
      const filterProducts = localProducts.filter(
        (product) => product.price < minMax[1] && product.price > minMax[0]
      );
      setProducts(filterProducts);
    }
  }
  return (
    <>
      <ProductContext.Provider value={{ filter }}>
        <nav>
          <Link to="/about">About</Link>
        </nav>
        <Header />
        <Button onClick={() => setShowCart(true)}>Open Cart </Button>
        {showCart && <Cart />}
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
