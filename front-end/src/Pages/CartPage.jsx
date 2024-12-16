import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        return;
      }
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed To Fetch Cart");
        return;
      }
      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);
  console.log(cart);
  return (
    <Container>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};

export default CartPage;
