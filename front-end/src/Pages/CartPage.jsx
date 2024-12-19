import { Box, Container, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {useNavigate} from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  const {
    cartItems,
    totalAmount,
    updateCartItem,
    deleteProductFromCart,
    clearProductInCart,
  } = useCart();
  const navigate=useNavigate()
  console.log("This Is CartItems", cartItems);
  return (
    <Container sx={{ mt: 4 }}>
      <TableContainer
        sx={{ display: "flex", flexDirection: "column" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {cartItems.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    style={{ width: "160px", height: "100px" }}
                    src={row.image}
                    alt={row.name}
                  />
                </TableCell>
                <TableCell align="right">{row.name}$</TableCell>
                <TableCell align="right">{row.price * row.quantity}$</TableCell>
                <TableCell align="right">
                  <Input type="number" value={row.quantity} />
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() =>
                        updateCartItem(row.productId, row.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    <Button
                      onClick={() =>
                        updateCartItem(row.productId, row.quantity - 1)
                      }
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ background: "red", color: "#fff" }}
                    onClick={() => deleteProductFromCart(row.productId)}
                  >
                    Remove Item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", color: "white" }}
            onClick={clearProductInCart}
          >
            Clear Cart
          </Button>
          <Button variant="contained" color="info" onClick={()=>{navigate('/checkout')}}>
            Checkout
          </Button>
        </Box>
      </TableContainer>
      <Typography sx={{ mt: 2 }} variant="h4">
        Total Amount:{totalAmount.toFixed(2)}$
      </Typography>
    </Container>
  );
};

export default CartPage;
