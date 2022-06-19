import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductData } from "../../interfaces/product";
import "./productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData>();
  const [loader, setLoader] = useState<Boolean>(false);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .then(() => setLoader(true));
  }, []);

  return (
    <>
      {loader && (
        <div className="details-container">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
}
export default ProductDetails;
