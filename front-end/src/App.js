import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import SecondComponent from "./Component/SecondComponent";
import Navbar from "./Component/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/second" element={<SecondComponent />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
