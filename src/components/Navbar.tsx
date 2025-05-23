import React, { useState } from "react";
import { FaBroom } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="gradient fixed w-full z-30 top-0 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaBroom className="text-white text-3xl" />
          <span className="text-2xl md:text-3xl font-bold tracking-wide">LimpiApp</span>
        </div>

        {/* Botón hamburguesa */}
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

        {/* Enlaces desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="#" className="hover:underline hover:text-gray-100 transition">Inicio</a>
          <a href="#" className="hover:underline hover:text-gray-100 transition">Servicios</a>
          <a href="#" className="hover:underline hover:text-gray-100 transition">Contacto</a>

          <Link to="/login">
            <button className="bg-white text-gray-800 font-semibold rounded-full px-6 py-2 shadow-md hover:scale-105 transition duration-300">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <a href="#" className="block text-white hover:underline">Inicio</a>
          <a href="#" className="block text-white hover:underline">Servicios</a>
          <a href="#" className="block text-white hover:underline">Contacto</a>
          <Link to="/login">
            <button className="w-full bg-white text-gray-800 font-semibold rounded-full px-6 py-2 shadow-md hover:scale-105 transition duration-300">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
