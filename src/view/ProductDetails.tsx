import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://bedecked-stone-turret.glitch.me/products/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  return (
    <>
      <h1>ProductDetails page</h1>
    </>
  );
}
export default ProductDetails;
