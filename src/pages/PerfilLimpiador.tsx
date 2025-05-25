import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PerfilLimpiador: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [misTareas, setMisTareas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "limpiador") {
      alert("No tienes permiso para acceder a esta sección");
      navigate("/");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || "Error al obtener solicitudes");
        }
        return res.json();
      })
      .then((data) => setSolicitudes(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });

    fetch("http://localhost:5000/api/solicitudes/asignadas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMisTareas(data))
      .catch((err) => console.error("Error al cargar mis tareas:", err));
  }, [navigate]);

  const tomarSolicitud = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/solicitudes/${id}/asignar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Solicitud asignada");
        window.location.reload();
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error("Error al asignar solicitud", err);
    }
  };

  const completarTarea = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/solicitudes/${id}/completar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Tarea completada");
        window.location.reload();
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error("Error al completar tarea", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">Solicitudes disponibles</h1>

      {error ? (
        <p className="text-red-600">⚠️ {error}</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-gray-500">No hay solicitudes por ahora.</p>
      ) : (
        <div className="grid gap-6">
          {solicitudes.map((s: any) => (
            <div
              key={s._id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {s.tipo.charAt(0).toUpperCase() + s.tipo.slice(1)}
                </h3>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {s.estado}
                </span>
              </div>
              <p className="text-sm text-gray-700"><strong>Dirección:</strong> {s.direccion}</p>
              <p className="text-sm text-gray-700"><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
              <p className="text-sm text-gray-700"><strong>Usuario:</strong> {s.user?.firstname ?? ""} {s.user?.lastname ?? ""}</p>
              <button
                onClick={() => tomarSolicitud(s._id)}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Tomar solicitud
              </button>
            </div>
          ))}
        </div>
      )}

      <hr className="my-10 border-gray-300" />

      <h2 className="text-2xl font-bold text-teal-600 mb-6">Mis tareas asignadas</h2>

      {misTareas.length === 0 ? (
        <p className="text-gray-500">No tienes tareas asignadas aún.</p>
      ) : (
        <div className="grid gap-6">
          {misTareas.map((t: any) => (
            <div
              key={t._id}
              className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{t.tipo}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  t.estado === "completada"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {t.estado}
                </span>
              </div>
              <p className="text-sm text-gray-700"><strong>Dirección:</strong> {t.direccion}</p>
              <p className="text-sm text-gray-700"><strong>Fecha:</strong> {new Date(t.fecha).toLocaleString()}</p>
              <p className="text-sm text-gray-700"><strong>Solicitante:</strong> {t.user?.firstname} {t.user?.lastname}</p>
              {t.estado !== "completada" && (
                <button
                  onClick={() => completarTarea(t._id)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Marcar como completada
                </button>
              )}
              {t.estado === "completada" && (
                <p className="mt-4 text-green-600 font-semibold text-sm">✅ Tarea completada</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfilLimpiador;
