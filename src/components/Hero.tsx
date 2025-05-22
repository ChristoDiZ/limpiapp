import React from "react";
import heroImg from "../assets/hero2.png"

const Hero: React.FC = () => {
  return (
    <div className="gradient pt-24 relative text-white overflow-hidden">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* Texto principal */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full text-sm">¿Qué tipo de usuario eres?</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Encuentra servicios de limpieza a domicilio
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Únete como cliente o trabajador hoy mismo.
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Comenzar ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="w-full md:w-3/5 py-6 text-center">
          <img
            className="w-3/4 max-w-lg mx-auto z-50"
            src={heroImg}
            alt="Hero Limpieza"
          />
        </div>
      </div>

      {/* OLA CURVA INFERIOR */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          className="w-full block"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M0,32L80,53.3C160,75,320,117,480,117.3C640,117,800,75,960,48C1120,21,1280,11,1360,5.3L1440,0V120H1360C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120H0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
