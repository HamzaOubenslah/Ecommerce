import { Box, Container, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const {
    cartItems,
    totalAmount,
    updateCartItem,
    deleteProductFromCart,
    clearProductInCart,
  } = useCart();
  const adress = useRef(null);
  const navigate = useNavigate();
  console.log("This Is CartItems", cartItems);
  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        fullWidth
        inputRef={adress}
        label="Delevery Adreess"
        name="Delevery Adress"
        sx={{ mb: 2 }}
      />
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
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "160px", height: "100px" }}
                    src={row.image}
                    alt={row.name}
                  />
                  <Box>{row.name}</Box>
                </TableCell>
                <TableCell align="right">{row.price * row.quantity}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        sx={{ mt: 2, textAlign: "right", fontWeight: "bold" }}
        variant="h6"
      >
        Total Amount:{totalAmount.toFixed(2)}$
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button fullWidth variant="contained" color="info">
          {" "}
          Pay Now
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
