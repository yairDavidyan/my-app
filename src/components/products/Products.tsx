import { Box, Grid, Slider } from "@mui/material";
import { useContext } from "react";
import productContext from "../../context/ProductContext";
import { ProductData } from "../../interfaces/product";
import ProductCard from "../card/ProductCard";

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
  function productAmount(id: number) {
    return cart.find((item) => item.id === id)?.amount;
  }
  const { filter, cart } = useContext(productContext);
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
      <Grid padding={6} container spacing={2}>
        {products.map((product) => (
          <Grid item xs={2}>
            <ProductCard
              amount={productAmount(product.id)}
              product={product}
              imageSize={350}
              key={product.id}
              isFlex={false}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Products;
