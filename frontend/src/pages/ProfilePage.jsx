// src/pages/ProfilePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};

  return (
    <div>
      <Navbar />
      <h2>Mi Perfil</h2>
      <p>Nombre: {user.name}</p>
      <p>Correo: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
