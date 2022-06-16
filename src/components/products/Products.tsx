import { Box, Slider } from "@mui/material";
import { useContext } from "react";
import productContext from "../../context/ProductContext";
import { ProductData } from "../../interfaces/product";
import Product from "../product/product";
import "./products.css";

function Products({
  products,
  minMax,
  setMinMax,
  min,
  max,
}: {
  products: ProductData[];
  minMax: number[] | number;
  min: number;
  max: number;
  setMinMax: React.Dispatch<React.SetStateAction<number[] | number>>;
}) {
  const { filter } = useContext(productContext);
  function handleChange(
    event: Event,
    newValue: number[] | number,
    activeThumb: number
  ) {
    setMinMax(newValue);
    if (filter) filter();
  }
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={minMax}
          min={min}
          max={max}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
      <section className="products">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </section>
    </>
  );
}

export default Products;
