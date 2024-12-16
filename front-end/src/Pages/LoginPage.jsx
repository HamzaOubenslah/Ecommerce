import React, { useRef, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const Navigate=useNavigate();
  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const token = await response.json();
      if (!token) {
        return;
      }
      login({ email, token });
      Navigate('/');

      if (response.ok) {
        console.log("Registration successful:", token);
      } else {
        console.error("Registration failed:", token.message);
        setError("You Can't Register, Try Another Credentials");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("You Can't Register, Try Another Credentials");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography variant="h3">Login To Your Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "60%",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <TextField label="Email" inputRef={emailRef} />
          <TextField label="Password" type="password" inputRef={passwordRef} />
          <Button variant="contained" color="info" onClick={handleSubmit}>
            Register
          </Button>
          {error && <p>{error}</p>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
