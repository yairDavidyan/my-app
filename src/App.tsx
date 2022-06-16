import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./view/Home";
import About from "./view/About";
import ProductDetails from "./view/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="productDetails/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
