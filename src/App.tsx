import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PerfilLimpiador from "./pages/PerfilLimpiador"; // ✅ IMPORTADO
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-limpiador" element={<PerfilLimpiador />} /> {/* ✅ NUEVA RUTA */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
