import { isArray, max, min } from "lodash";
import { useEffect, useState } from "react";
import Cart from "../components/cart/Cart";
import Header from "../components/header/header";
import Products from "../components/products/Products";
import ProductContext from "../context/ProductContext";
import { ProductData } from "../interfaces/product";

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
    fetch("/products")
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
    const localProduct = cart.find((product) => product.id === id);
    if (localProduct) {
      setCart(
        cart.map((item) =>
          item.id === localProduct.id
            ? { ...localProduct, amount: localProduct.amount + 1 }
            : item
        )
      );
    } else {
      const product = localProducts.find((product) => product.id === id);
      setCart((prev) => [...prev, { ...product, amount: 1 }]);
    }
  }
  function removeFromCart(id: number) {
    const indexProduct = cart.findIndex((product) => product.id === id);
    const localProduct = cart.find((product) => product.id === id);
    if (indexProduct >= 0) {
      setCart(
        cart.map((item) =>
          item.id === localProduct.id
            ? { ...localProduct, amount: localProduct.amount - 1 }
            : item
        )
      );
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
  function categotyFilter(category) {
    let newProducts =
      category === "All"
        ? localProducts
        : localProducts.filter((product) => category === product.category);
    console.log(newProducts);
    setProducts(newProducts);
  }
  return (
    <ProductContext.Provider
      value={{ filter, cart, addToCart, removeFromCart }}
    >
      <Header
        categories={categories}
        filterByCategory={categotyFilter}
        setShowCart={setShowCart}
      />
      <Cart setShowCart={setShowCart} showCart={showCart} />
      <Products
        products={products}
        minMax={minMax}
        min={minPrice}
        max={maxPrice}
        setMinMax={setMinMax}
      />
    </ProductContext.Provider>
  );
}

export default Home;
