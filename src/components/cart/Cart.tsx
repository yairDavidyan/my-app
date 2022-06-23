import { Grid, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
import ProductCard from "../card/ProductCard";

export default function Cart({ setShowCart, showCart }) {
  const { cart } = useContext(ProductContext);

  return (
    <>
      {cart.length > 0 && (
        <Drawer
          anchor={"left"}
          open={showCart}
          onClose={() => setShowCart(false)}
        >
          <Grid>
            <Typography>Shopping Cart</Typography>
          </Grid>
          {cart.map(
            (product) =>
              product.amount > 0 && (
                <ProductCard
                  isFlex={true}
                  product={product}
                  imageSize={"60"}
                  amount={product.amount}
                />
              )
          )}
        </Drawer>
      )}
    </>
  );
}
