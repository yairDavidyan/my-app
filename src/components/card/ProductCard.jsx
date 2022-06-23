import { useContext, useState } from "react";
import ProductContext from "../../context/ProductContext";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
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
}) {
  const { addToCart, removeFromCart } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  function addCart(id) {
    addToCart(id);
  }
  function removeCart(id) {
    if (amount > 0) {
      removeFromCart(id);
    }
  }

  return (
    <Card
      sx={isFlex ? { display: "flex" } : {}}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      key={product.id}
    >
      <Link to={`./productDetails/${product.id}`}>
        <CardMedia
          component="img"
          height={imageSize}
          image={product.image}
          alt="img"
        />
      </Link>
      <CardContent>
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
  );
}
