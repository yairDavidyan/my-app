import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
import ProductCard from "../card/ProductCard";

export default function Cart({
  setShowCart,
  showCart,
  removeAllCart,
  productsListToRemove,
}) {
  const { cart, selectedRemove, setProductsListToRemove } =
    useContext(ProductContext);
  function closeCart() {
    setProductsListToRemove([]);
    setShowCart(false);
  }

  return (
    <Drawer
      open={showCart}
      onClose={closeCart}
      PaperProps={{
        sx: { minWidth: "25%" },
      }}
    >
      <Grid>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          {productsListToRemove.length > 0 ? (
            <Button onClick={selectedRemove}>Remove Selected</Button>
          ) : (
            <Button onClick={removeAllCart}>Remove All</Button>
          )}
        </Stack>
      </Grid>
      <Grid sx={{ overflow: "auto" }}>
        {cart.map(
          (product) =>
            product.amount > 0 && (
              <>
                <ProductCard
                  isFlex={true}
                  product={product}
                  imageSize={"120"}
                  amount={product.amount}
                  widthCounter={"40%"}
                  isCheckbox={true}
                />
                <Divider />
              </>
            )
        )}
      </Grid>
    </Drawer>
  );
}
