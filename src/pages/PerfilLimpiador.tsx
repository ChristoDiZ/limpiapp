import React, { useEffect, useState } from "react";

const PerfilLimpiador: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [limpiador, setLimpiador] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) setLimpiador(JSON.parse(storedUser));

    fetch("http://localhost:5000/api/solicitudes", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setSolicitudes(data))
      .catch(err => console.error("Error al cargar solicitudes:", err));
  }, []);

  const tomarSolicitud = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/solicitudes/${id}/asignar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ Solicitud asignada");
      window.location.reload();
    } else {
      alert(`❌ ${data.msg}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Solicitudes disponibles</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes por ahora.</p>
      ) : (
        solicitudes.map((s: any) => (
          <div key={s._id} className="border p-4 rounded mb-4 shadow">
            <p><strong>Dirección:</strong> {s.direccion}</p>
            <p><strong>Tipo:</strong> {s.tipo}</p>
            <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
            <p><strong>Usuario:</strong> {s.user?.firstname} {s.user?.lastname}</p>
            {s.estado === "pendiente" && (
              <button
                className="mt-2 bg-teal-500 text-white px-4 py-2 rounded"
                onClick={() => tomarSolicitud(s._id)}
              >
                Tomar solicitud
              </button>
            )}
            {s.estado === "asignada" && (
              <p className="text-green-600 font-semibold mt-2">Ya asignada</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PerfilLimpiador;
