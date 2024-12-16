import { createContext, useContext, useState } from "react";

export const Auth = createContext(null);
export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = ({ email, token }) => {
    setEmail(email);
    setToken(token);
    console.log("I'm The Login Function");
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setEmail(null);
    setToken(null);
  };
  const isAuthenticated = !!token;
  return (
    <Auth.Provider value={{ email, token, isAuthenticated, login, logout }}>
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;
