import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Lado izquierdo verde con ola */}
      <div className="relative gradient flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-4xl font-bold mb-4">LimpiApp</h2>
        <p className="text-lg max-w-sm text-center">
          La forma más fácil y segura de agendar servicios de limpieza a domicilio o para tu negocio.
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

      {/* Lado derecho blanco con login */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Iniciar sesión en LimpiApp</h1>
            <p className="text-sm text-gray-500">Conecta con tu cuenta para agendar o gestionar servicios</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="tucorreo@ejemplo.com"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-teal-600" />
                Recuérdame
              </label>
              <a href="#" className="text-teal-600 hover:underline">Olvidé mi contraseña</a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Aún no tienes una cuenta?{' '}
            <Link to="/register">
              <span className="text-teal-600 hover:underline">Regístrate</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;