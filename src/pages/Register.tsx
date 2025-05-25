import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"usuario" | "limpiador" | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          role: selectedRole, // ✅ enviamos el rol
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = selectedRole === "limpiador" ? "/perfil-limpiador" : "/perfil";
      } else {
        alert(`❌ Error: ${data.msg}`);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Error en el servidor");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Lado izquierdo verde con ola */}
      <div className="relative gradient flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-4xl font-bold mb-4">LimpiApp</h2>
        <p className="text-lg max-w-sm text-center">
          Regístrate como cliente o profesional y únete a nuestra red de servicios de limpieza confiables.
        </p>

        <svg
          className="absolute right-0 top-0 h-full w-24 md:w-48 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100,0 C60,50 60,50 100,100 L100,100 L100,0 Z" fill="white" />
        </svg>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {!selectedRole ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Cómo deseas registrarte?</h1>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setSelectedRole("limpiador")}
                  className="w-1/2 border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Socio Limpiador →
                </button>
                <button
                  onClick={() => setSelectedRole("usuario")}
                  className="w-1/2 border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Usuario →
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Registro como {selectedRole}</h1>
                <p className="text-sm text-gray-500">Completa tus datos para crear una cuenta</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Nombre"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-full font-semibold">
                  Registrarse
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-teal-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>

              <button
                onClick={() => setSelectedRole(null)}
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                ← Elegir otro tipo de cuenta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
