import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API=import.meta.env.VITE_API_URL

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"usuario" | "limpiador" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Guarda el token en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // ✅ Guarda el usuario en el contexto (como ya tenías)
        login(data.user);
  
        // ✅ Redirige según el rol
        navigate(data.user.role === "limpiador" ? "/perfil-limpiador" : "/perfil");
      } else {
        alert(`❌ Error: ${data.msg}`);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("❌ Error en el servidor");
    }
  };
  

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Lado izquierdo verde con ola */}
      <div className="relative gradient flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-4xl font-bold mb-4">LimpiApp</h2>
        <p className="text-lg max-w-sm text-center">
          La forma más fácil y segura de agendar servicios de limpieza a domicilio o para tu negocio.
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
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Cómo deseas ingresar?</h1>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Iniciar sesión como {selectedRole}</h1>
                <p className="text-sm text-gray-500">Conecta con tu cuenta para continuar</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    placeholder="********"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition"
                >
                  Iniciar sesión
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                ¿Aún no tienes una cuenta?{" "}
                <Link to="/register">
                  <span className="text-teal-600 hover:underline">Regístrate</span>
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

export default LoginPage;
