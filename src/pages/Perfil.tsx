import React, { useEffect, useState } from 'react';

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
      <h1 className="text-3xl font-bold">Bienvenido, {user.firstname}</h1>
      <p>Correo: {user.email}</p>
    </div>
  );
};

export default PerfilPage;
