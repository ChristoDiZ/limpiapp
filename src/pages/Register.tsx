import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
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
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data)); // Guarda usuario
      window.location.href = "/perfil"; // Redirige a la página de perfil
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

        {/* Ola decorativa */}
        <svg
          className="absolute right-0 top-0 h-full w-24 md:w-48 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100,0 C60,50 60,50 100,100 L100,100 L100,0 Z" fill="white" />
        </svg>
      </div>

      {/* Lado derecho blanco con formulario de registro */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear cuenta en LimpiApp</h1>
            <p className="text-sm text-gray-500">Regístrate para solicitar o realizar servicios de limpieza</p>
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;