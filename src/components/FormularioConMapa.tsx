import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Posición inicial: Calama
const DEFAULT_POSITION: LatLngExpression = [-22.4662, -68.9259];

const MoverMapa = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 15);
  }, [position, map]);
  return null;
};

// Transición uniforme (como en Beneficios)
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const FormularioConMapa: React.FC = () => {
  const [direccion, setDireccion] = useState("");
  const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
  const [error, setError] = useState("");

  useEffect(() => {
    if (direccion.trim() === "") return;

    const delayDebounce = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
            setError("");
          } else {
            setError("Dirección no encontrada.");
          }
        })
        .catch(() => {
          setError("Error al buscar la dirección.");
        });
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [direccion]);

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-col md:flex-row items-start justify-between gap-6">

        {/* FORMULARIO con fadeUp */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full md:max-w-md space-y-5 bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Agenda un servicio</h2>

          <input
            type="text"
            placeholder="Ingresa tu dirección..."
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 flex justify-between items-center">
            <label htmlFor="tipo" className="mr-2 font-medium">Tipo:</label>
            <select
              id="tipo"
              name="tipo"
              className="bg-transparent focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Selecciona</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="oficina">Oficina</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 w-1/2">
              <span className="mr-2">📅</span>
              <input type="date" className="bg-transparent w-full focus:outline-none" />
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 w-1/2">
              <span className="mr-2">⏰</span>
              <input type="time" className="bg-transparent w-full focus:outline-none" />
            </div>
          </div>

          <button className="w-full bg-teal-400 text-white text-sm font-semibold py-3 rounded-lg hover:bg-teal-600 transition">
            Buscar profesionales
          </button>

          <p className="text-sm text-center text-gray-500 underline hover:text-gray-700 transition">
            Inicia sesión para ver tu actividad reciente
          </p>
        </motion.div>

        {/* MAPA con fadeUp */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg z-0"
        >
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
            <MoverMapa position={position} />
            <Marker position={position} />
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default FormularioConMapa;
