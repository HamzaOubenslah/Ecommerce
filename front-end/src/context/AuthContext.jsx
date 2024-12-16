import { createContext, useContext, useState } from "react";

export const Auth = createContext(null);
export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const login = ({ email, token }) => {
    setEmail(email);
    setToken(token);
    console.log("I'm The Login Function")
    localStorage.setItem('user-data',JSON.stringify({email,token}))
  };
  return (
    <Auth.Provider value={{ email, token, login }}>{children}</Auth.Provider>
  );
};
export default AuthProvider;
