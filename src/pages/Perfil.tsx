import React, { useEffect, useState } from 'react';
import FormularioConMapa from "../components/FormularioConMapa"; // ajusta la ruta según tu estructura


const PerfilPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.firstname}</h1>
      <p className="mb-6">Correo: {user.email}</p>
  
      <FormularioConMapa />
    </div>
  );
};

export default PerfilPage;
