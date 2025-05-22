import React from "react";
import { FaBroom } from "react-icons/fa";
import { Link } from "react-router-dom";


<Link to="/login">
  <button className="bg-white text-gray-800 font-semibold rounded-full px-6 py-2 shadow-md hover:scale-105 transition duration-300">
    Iniciar Sesión
  </button>
</Link>


const Navbar: React.FC = () => {
  return (
    <nav className="gradient fixed w-full z-30 top-0 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">
        
        {/* Logo + Icono */}
        <div className="flex items-center space-x-2">
          <FaBroom className="text-white text-3xl" />
          <span className="text-2xl md:text-3xl font-bold tracking-wide">LimpiaYa</span>
        </div>

        {/* Botón hamburguesa (si implementas mobile menu) */}
        <div className="block lg:hidden">
          <button className="text-white focus:outline-none">
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

        {/* Enlaces */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="#" className="hover:underline hover:text-gray-100 transition">Inicio</a>
          <a href="#" className="hover:underline hover:text-gray-100 transition">Servicios</a>
          <a href="#" className="hover:underline hover:text-gray-100 transition">Contacto</a>

          {/* CTA */}
          <Link to="/login">
  <button className="bg-white text-gray-800 font-semibold rounded-full px-6 py-2 shadow-md hover:scale-105 transition duration-300">
    Iniciar Sesión
  </button>
</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
