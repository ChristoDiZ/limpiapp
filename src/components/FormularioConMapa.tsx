import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

interface Props {
  onNuevaSolicitud: () => void;
}

const DEFAULT_POSITION: LatLngExpression = [-22.4662, -68.9259];

const MoverMapa = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 15);
  }, [position, map]);
  return null;
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const FormularioConMapa: React.FC<Props> = ({ onNuevaSolicitud }) => {
  const [direccion, setDireccion] = useState("");
  const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
  const [error, setError] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
      return;
    }

    const fechaCompleta = new Date(`${fecha}T${hora}`);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          direccion,
          coords: {
            lat: (position as [number, number])[0],
            lng: (position as [number, number])[1]
          },
          tipo,
          fecha: fechaCompleta
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Solicitud enviada correctamente");
        setDireccion("");
        setTipo("");
        setFecha("");
        setHora("");
        onNuevaSolicitud(); // ✅ Actualiza lista de solicitudes
      } else {
        alert(`❌ Error: ${data.msg}`);
      }
    } catch (err) {
      console.error("Error al enviar solicitud:", err);
      alert("❌ Error del servidor");
    }
  };

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
        <motion.form
          onSubmit={handleSubmit}
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
            className="w-full px-4 py-3 border rounded-lg text-sm"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-sm"
            required
          >
            <option value="" disabled>Selecciona tipo</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="oficina">Oficina</option>
          </select>

          <div className="flex gap-3">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg text-sm"
              required
            />
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition"
          >
            Enviar solicitud de limpieza
          </button>

          <p className="text-sm text-center text-gray-500 underline hover:text-gray-700 transition">
            Inicia sesión para ver tu actividad reciente
          </p>
        </motion.form>

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
