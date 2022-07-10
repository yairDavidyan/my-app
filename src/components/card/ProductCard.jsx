import { useContext, useState } from "react";
import ProductContext from "../../context/ProductContext";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  isFlex,
  imageSize,
  amount = 0,
  widthCounter = "90%",
  isCheckbox = false,
}) {
  const { addToCart, removeFromCart, setProductsListToRemove } =
    useContext(ProductContext);
  const [show, setShow] = useState(false);
  function addCart(id) {
    addToCart(id);
  }
  function removeCart(id) {
    if (amount > 0) {
      removeFromCart(id);
    }
  }
  function handleChackbox(checked, id) {
    if (checked) {
      setProductsListToRemove((prev) => [...prev, checked ? product.id : ""]);
    } else {
      setProductsListToRemove((prev) =>
        prev.filter((productId) => productId !== id)
      );
    }
  }

  return (
    <>
      <Card
        sx={
          isFlex
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
            : {}
        }
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        key={product.id}
      >
        <Stack justifyContent={"center"}>
          {isCheckbox && (
            <Checkbox
              onChange={(e) => handleChackbox(e.target.checked, product.id)}
              inputProps={{ "aria-label": "Checkbox demo" }}
            />
          )}
        </Stack>

        <Link to={`./productDetails/${product.id}`}>
          <CardMedia
            component="img"
            height={imageSize}
            image={product.image}
            alt="img"
          />
        </Link>
        <CardContent sx={{ width: widthCounter }}>
          <Typography noWrap sx={{ fontWeight: "bold", marginBottom: "15px" }}>
            {product.title}
          </Typography>
          <Typography align="center" sx={{ marginBottom: "10px" }}>
            {product.price}
          </Typography>
          {(show || amount > 0) && (
            <Grid container sx={{ justifyContent: "space-between" }}>
              <IconButton onClick={() => removeCart(product.id)}>
                <RemoveIcon sx={{ color: "#ed1566", fontSize: "1rem" }} />
              </IconButton>
              <Typography style={{ color: "#ed1566", fontSize: "1rem" }}>
                {amount}
              </Typography>
              <IconButton
                aria-label="add to shopping cart"
                onClick={() => addCart(product.id)}
              >
                <AddIcon sx={{ color: "#ed1566", fontSize: "1rem" }} />
              </IconButton>
            </Grid>
          )}
        </CardContent>
      </Card>
      {/* <Divider /> */}
    </>
  );
}
