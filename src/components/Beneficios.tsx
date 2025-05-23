import React from "react";
import hogarImg from "../assets/beneficio-hogar.png";
import oficinaImg from "../assets/beneficio-oficina.png";
import eventoImg from "../assets/beneficio-evento2.png";

const Beneficios: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 space-y-12 sm:space-y-14 md:space-y-16">


        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">
          Beneficios
        </h2>

        {/* Tarjeta 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={hogarImg}
            alt="Servicio hogar"
            className="w-full md:max-w-md rounded-xl shadow-md"
          />
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Servicio de limpieza en el hogar</h3>
            <p className="text-gray-600 mb-4">
              Agenda fácilmente con expertos en limpieza para mantener tu hogar impecable. Profesionales verificados, disponibilidad inmediata.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <button className="bg-teal-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition">
                Comenzar
              </button>
              <a href="#" className="text-sm underline text-gray-600 hover:text-green-600">
                ¿Ya tienes una cuenta? Inicia sesión
              </a>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <img
            src={oficinaImg}
            alt="Limpieza oficinas"
            className="w-full md:max-w-md rounded-xl shadow-md"
          />
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Limpieza para empresas y oficinas</h3>
            <p className="text-gray-600 mb-4">
              Ofrecemos soluciones profesionales de limpieza para espacios corporativos. Flexibilidad horaria y personal capacitado.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <button className="bg-teal-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition">
                Comenzar
              </button>
              <a href="#" className="text-sm underline text-gray-600 hover:text-green-600">
                Conoce nuestras soluciones
              </a>
            </div>
          </div>
        </div>
        {/* Tarjeta 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={eventoImg}
            alt="Servicio hogar"
            className="w-full md:max-w-md rounded-xl shadow-md"
          />
          <div className="w-full md:w-1/2 text-center md:text-left">
  <h3 className="text-2xl font-bold mb-2">Limpieza para eventos y espacios públicos</h3>
  <p className="text-gray-600 mb-4">
    Asegura espacios limpios antes, durante y después de eventos. Ideal para ferias, actividades comunitarias y celebraciones al aire libre.
  </p>
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    <button className="bg-teal-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition">
      Solicitar servicio
    </button>
    <a href="#" className="text-sm underline text-gray-600 hover:text-green-600">
      ¿Ya tienes cuenta? Inicia sesión
    </a>
  </div>
</div>

        </div>

      </div>
    </section>
  );
};

export default Beneficios;
