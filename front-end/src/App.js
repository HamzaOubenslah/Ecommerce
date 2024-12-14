import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import SecondComponent from "./Component/SecondComponent";
import Navbar from "./Component/Navbar";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second" element={<SecondComponent />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
