import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const Cart = createContext(null);
export const useCart = () => useContext(Cart);

const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

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
      const cart = await response.json();
      console.log(cart);
      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.price,
      }));
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/cart/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
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
  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await fetch("http://localhost:5000/cart/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const cart = await response.json();
      if (!cart) {
        console.log("Failed To Fetch The Updated Cart");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
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

  const deleteProductFromCart = async (productId) => {
    console.log(productId)
    try {
      const response = await fetch(
        `http://localhost:5000/cart/item/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cart =await response.json();
      if (!cart) {
        setError("Failed To Delete The Product");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.price,
      }));
      // const cartItemsMapped = cart.items.filter(
      //   (i) => i.product._id.toString() !== productId
      // );
      // console.log(cartItemsMapped);
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const clearProductInCart=async()=>{
    try{
      const response=await fetch('http://localhost:5000/cart',{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        }
      });
      const cart=await response.json();
      if(!cart){
        setError('Failed To Clear Your Cart')
      }
      cart.totalAmount=0
      setCartItems([]);
      setTotalAmount(cart.totalAmount);
    }catch(error){
      console.error(error)
    }

  }

  return (
    <Cart.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateCartItem,
        deleteProductFromCart,
        clearProductInCart
      }}
    >
      {children}
    </Cart.Provider>
  );
};
export default CartProvider;
