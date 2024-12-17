import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

export const Cart = createContext(null);
export const useCart = () => useContext(Cart);

const CartProvider = ({ children }) => {
  const {token}=useAuth()
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const addItemToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/cart/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) {
        setError("Failed To Add To Cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed To Fetch Cart");
      }
      const cartItemsMapped = cart.items.map(({product, quantity}) => ({
        productId: product._id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.price,
      }));
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Cart.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </Cart.Provider>
  );
};
export default CartProvider;
