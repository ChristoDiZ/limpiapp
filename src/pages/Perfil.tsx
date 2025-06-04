import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioConMapa from "../components/FormularioConMapa";
import MisSolicitudes from "../components/MisSolicitudes";
const API=import.meta.env.VITE_API_URL

const PerfilPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    actualizarSolicitudes(); // 🔁 carga inicial
  }, [navigate]);

  // ✅ función para recargar solicitudes creadas por el usuario
  const actualizarSolicitudes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API}/api/solicitudes/mis-solicitudes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al obtener solicitudes", error);
    }
  };

  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.firstname}</h1>
      <p className="mb-6">Correo: {user.email}</p>

      <FormularioConMapa onNuevaSolicitud={actualizarSolicitudes} />
      <MisSolicitudes solicitudes={solicitudes} />
    </div>
  );
};

export default PerfilPage;
