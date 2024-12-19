import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import SecondComponent from "./Component/SecondComponent";
import Navbar from "./Component/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import ProtectedRoute from "./Component/ProtectedRoute";
import CartProvider from "./context/CartContext";
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/second" element={<SecondComponent />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
