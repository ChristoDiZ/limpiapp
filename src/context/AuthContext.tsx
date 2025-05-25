import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null); // si usas useState para el usuario
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>

      {children}
    </AuthContext.Provider>
  );
};
