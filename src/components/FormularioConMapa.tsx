import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const FormularioConMapa: React.FC = () => {
  const position: LatLngExpression = [-22.4662, -68.9259]; // Calama de Chile

  return (
    <section className="py-16 bg-white text-gray-800">
  <div className="container mx-auto px-40 md:px-40 flex flex-col md:flex-row items-start justify-between gap-10">

    {/* Dirección */}    
    <div className="w-full md:max-w-md space-y-5 bg-white p-6 rounded-xl shadow-md">  
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Agenda un servicio</h2>

  {/* Dirección */}
  <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700">
    <span className="flex items-center gap-2">
      <span className="text-black">●</span> Dirección
    </span>
    <span className="text-xl">📍</span>
  </div>

  {/* Tipo de espacio */}
  <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 flex justify-between items-center">
    <label htmlFor="tipo" className="mr-2 font-medium">
      Tipo:
    </label>
    <select
      id="tipo"
      name="tipo"
      className="bg-transparent focus:outline-none"
      defaultValue=""
    >
      <option value="" disabled>
        Selecciona
      </option>
      <option value="casa">Casa</option>
      <option value="departamento">Departamento</option>
      <option value="oficina">Oficina</option>
    </select>
  </div>

  {/* Fecha + Hora */}
  <div className="flex gap-3">
    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 w-1/2">
      <span className="mr-2">📅</span>
      <input
        type="date"
        className="bg-transparent w-full focus:outline-none"
      />
    </div>
    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 w-1/2">
      <span className="mr-2">⏰</span>
      <input
        type="time"
        className="bg-transparent w-full focus:outline-none"
      />
    </div>
  </div>
  

  {/* Botón */}
  <button className="w-full bg-teal-400 text-white text-sm font-semibold py-3 rounded-lg hover:bg-teal-600 transition">
    Buscar profesionales
  </button>

  {/* Enlace */}
  <p className="text-sm text-center text-gray-500 underline hover:text-gray-700 transition">
    Inicia sesión para ver tu actividad reciente
  </p>
</div>


        {/* MAPA */}
        <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg z-0">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default FormularioConMapa;
