import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SuccessOrder = () => {
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate('/')
    }
  return (
    <Container>
        <Button onClick={handleNavigate} sx={{mt:"10px"}} variant="contained">Go To Home Page</Button>
        <Box sx={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
            <CheckCircleOutline sx={{ color: "green", fontSize: "80px",mt:"30px",mb:"20px" }} />
      <Typography variant="h4">
        Thank You For Your Order, Now We Processing The Order
      </Typography>
        </Box>
      
    </Container>
  );
};

export default SuccessOrder;
