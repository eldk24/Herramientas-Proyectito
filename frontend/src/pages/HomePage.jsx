import { Link } from 'react-router-dom';
import '../styles/App.css';

import React from 'react';


const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a la página principal</h1>
      <p>Explora nuestros recursos educativos.</p>
      <Link to="/login">Iniciar sesión</Link>
      <Link to="/register">Registrarse</Link>
    </div>
  );
};

export default HomePage;
