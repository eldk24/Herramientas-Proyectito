import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        Sistema de Gestión de Recursos Educativos
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Bienvenido/a al sistema de gestión de recursos educativos digitales para docentes de la UTP.
        Accede o regístrate para comenzar a gestionar tus materiales de enseñanza.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </Router>
);
