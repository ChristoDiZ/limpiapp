import React from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Lado izquierdo verde con ola */}
      <div className="relative gradient flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-4xl font-bold mb-4">LimpiaYa</h2>
        <p className="text-lg max-w-sm text-center">
          Regístrate como cliente o profesional y únete a nuestra red de servicios de limpieza confiables.
        </p>

        {/* Ola decorativa */}
        <svg
          className="absolute right-0 top-0 h-full w-24 md:w-48 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100,0 C60,50 60,50 100,100 L100,100 L100,0 Z" fill="white" />
        </svg>
      </div>

      {/* Lado derecho blanco con formulario de registro */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear cuenta en LimpiaYa</h1>
            <p className="text-sm text-gray-500">Regístrate para solicitar o realizar servicios de limpieza</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="********"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition"
            >
              Registrarse
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login">
              <span className="text-teal-600 hover:underline">Inicia sesión</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
