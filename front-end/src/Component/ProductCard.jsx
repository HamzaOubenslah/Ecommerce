import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/CartContext";

export default function CardProduct({ _id, name, price, image }) {
  const { addItemToCart } = useCart();
  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} $
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => addItemToCart(_id)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
