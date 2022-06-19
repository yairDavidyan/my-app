import "./cart.css";
import Drawer from "@mui/material/Drawer";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";

export default function Cart({ setShowCart }) {
  const { cart } = useContext(ProductContext);

  return (
    <div>
      <Drawer anchor={"left"} open={true} onClose={() => setShowCart(false)}>
        {cart.map((product) => (
          <>
            <div className="cart-container">
              <img src={product.image} alt="img" className="image-size" />
              <div>{product.title}</div>
              <div>{product.price}</div>
            </div>
          </>
        ))}
      </Drawer>
    </div>
  );
}
