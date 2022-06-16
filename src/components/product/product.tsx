import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductData } from "../../interfaces/product";

function Product({ product } :{ product: ProductData} ) {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="product-card">
        <Link to={`/productDetails/${product.id}`}>
          <div className="product-image">
            <img src={product.image} alt="img" />
          </div>
        </Link>
        <div className="product-info">
          <h5>{product.title}</h5>
          <h6>{product.price}</h6>
        </div>
        <span>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <h6>{count}</h6>
        </span>
      </div>
    </>
  );
}

export default Product;