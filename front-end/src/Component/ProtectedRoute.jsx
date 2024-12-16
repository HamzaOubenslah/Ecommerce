import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }
  console.log("Protected Route");
  return <Outlet />;
};

export default ProtectedRoute;