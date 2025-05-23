import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white">
      {/* Onda superior */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          className="w-full block"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#3ac3a4"
            d="M0,32L80,53.3C160,75,320,117,480,117.3C640,117,800,75,960,48C1120,21,1280,11,1360,5.3L1440,0V120H1360C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120H0Z"
          />
        </svg>
      </div>

      {/* Contenido sobre fondo degradado */}
      <div className="gradient text-white text-center px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Gracias por confiar en LimpiApp</h2>
        <p className="text-sm md:text-base mb-6">
          Conectamos hogares y empresas con profesionales de limpieza verificados.
        </p>
        <button className="bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
          Contáctanos
        </button>
        <p className="text-xs mt-6 text-white/80">
          © 2025 LimpiApp. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
