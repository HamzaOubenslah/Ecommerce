import { createContext, useContext, useState } from "react";

export const Cart = createContext(null);
export const useCart = () => useContext(Cart);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCart = (productId) => {
    console.log(productId);
  };

  return (
    <Cart.Provider value={{cartItems, totalAmount, addItemToCart}}>
      {children}
    </Cart.Provider>
  );
};
export default CartProvider;
