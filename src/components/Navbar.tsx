import React, { useContext, useState } from "react";
import { FaBroom } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Ocultar navbar en login y register
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  return (
    <nav className="gradient fixed w-full z-30 top-0 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaBroom className="text-white text-3xl" />
          <span className="text-2xl md:text-3xl font-bold tracking-wide">LimpiApp</span>
        </div>

        {/* Botón hamburguesa (móvil) */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menú</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Enlaces en escritorio */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/contacto">Contacto</Link>

          {user ? (
            <>
              <span className="font-semibold">Hola, {user.firstname}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-gray-800 font-semibold rounded-full px-4 py-1 ml-2 hover:bg-gray-200 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-white text-gray-800 font-semibold rounded-full px-6 py-2 hover:bg-gray-200 transition">
                Iniciar Sesión
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Enlaces en móvil */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <Link to="/" className="block text-white hover:underline">Inicio</Link>
          <Link to="/servicios" className="block text-white hover:underline">Servicios</Link>
          <Link to="/contacto" className="block text-white hover:underline">Contacto</Link>
          {user ? (
            <>
              <span className="block text-white font-semibold">Hola, {user.firstname}</span>
              <button
                onClick={handleLogout}
                className="w-full bg-white text-gray-800 font-semibold rounded-full px-6 py-2 hover:bg-gray-200 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="w-full bg-white text-gray-800 font-semibold rounded-full px-6 py-2 hover:bg-gray-200 transition">
                Iniciar Sesión
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
