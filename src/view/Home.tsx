import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { isArray, max, min } from "lodash";
import { Fragment, useEffect, useState } from "react";
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
  const [productsListToRemove, setProductsListToRemove] = useState<number[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

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
    const productAdd = cart.find((product) => product.id === id);
    if (productAdd) {
      setCart(
        cart.map((product) =>
          product.id === productAdd.id
            ? { ...productAdd, amount: productAdd.amount + 1 }
            : product
        )
      );
    } else {
      const product = localProducts.find((product) => product.id === id);
      setCart((prevProducts) => [...prevProducts, { ...product, amount: 1 }]);
    }
  }

  function removeFromCart(id: number) {
    const productRemove = cart.find((product) => product.id === id);
    if (productRemove) {
      setCart(
        cart.map((product) =>
          product.id === productRemove.id
            ? { ...productRemove, amount: productRemove.amount - 1 }
            : product
        )
      );
    }
  }

  function removeAllCart() {
    setCart([]);
  }
  console.log(cart);

  function selectedRemove() {
    setCart(
      cart.filter((product) => !productsListToRemove.includes(product.id))
    );
    setProductsListToRemove([]);
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
  console.log(productsListToRemove);

  return (
    <ProductContext.Provider
      value={{
        filter,
        cart,
        addToCart,
        removeFromCart,
        productsListToRemove,
        setProductsListToRemove,
        selectedRemove,
      }}
    >
      <Header
        categories={categories}
        filterByCategory={categotyFilter}
        setShowCart={setShowCart}
      />
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
      <Cart
        setShowCart={setShowCart}
        showCart={showCart}
        removeAllCart={removeAllCart}
        productsListToRemove={productsListToRemove}
      />
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
