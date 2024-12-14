import React, { useRef, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const RegisterPage = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    const username = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:",data);
      } else {
        console.error("Registration failed:", data.message);
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
        <Typography variant="h3">Register New Account</Typography>
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
          <TextField label="Username" inputRef={nameRef} />
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

export default RegisterPage;
