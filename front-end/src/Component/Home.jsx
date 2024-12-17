import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardProduct from "./ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const Response = await fetch("http://localhost:5000/products");
      const data = await Response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid item md={4}>
            <CardProduct {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Home;
