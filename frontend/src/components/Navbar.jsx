import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Inicio</Link>
      <Link to="/upload">Subir</Link>
      <Link to="/search">Buscar</Link>
      <Link to="/collections">Colecciones</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/login" onClick={() => localStorage.removeItem('currentUser')}>Salir</Link>
    </nav>
  );
};

export default Navbar;