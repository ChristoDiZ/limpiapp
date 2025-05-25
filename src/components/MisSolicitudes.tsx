import React from "react";

interface Props {
  solicitudes: any[];
}

const MisSolicitudes: React.FC<Props> = ({ solicitudes }) => {
  return (
    <section className="mt-12 bg-white py-10 px-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-teal-600 mb-6">Tus solicitudes</h2>

      {solicitudes.length === 0 ? (
        <p className="text-gray-600 text-center">No has creado ninguna solicitud aún.</p>
      ) : (
        <div className="grid gap-6">
          {solicitudes.map((s) => (
            <div
              key={s._id}
              className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {s.tipo.charAt(0).toUpperCase() + s.tipo.slice(1)} - {new Date(s.fecha).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">{new Date(s.fecha).toLocaleTimeString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${
                    s.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : s.estado === "asignada"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {s.estado.charAt(0).toUpperCase() + s.estado.slice(1)}
                </span>
              </div>

              <p className="text-gray-700">
                <strong>Dirección:</strong> {s.direccion}
              </p>

              <p className="text-gray-700 mt-1">
                <strong>Limpiador:</strong>{" "}
                {s.limpiador
                  ? `${s.limpiador.firstname} ${s.limpiador.lastname}`
                  : <span className="italic text-gray-400">Sin asignar</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MisSolicitudes;
