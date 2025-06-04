// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'estudiante' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = storedUsers.some(user => user.email === formData.email);
    if (emailExists) return alert('El correo ya está registrado.');
    storedUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Usuario registrado exitosamente');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        .form-container {
          background: linear-gradient(135deg, #b30000, #ff4d4d);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        form {
          background: white;
          padding: 40px 35px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(179, 0, 0, 0.3);
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
        }

        form::before {
          content: 'UTP';
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 48px;
          font-weight: 900;
          color:rgb(255, 125, 125);
          color:rgb(255, 118, 118);
          -webkit-text-stroke: 1px rgb(123, 0, 0);
          text-stroke: 1px white;
          letter-spacing: 5px;
          text-shadow: 2px 2px 5px rgba(179, 0, 0, 0.6);
        }

        h2 {
          margin-bottom: 25px;
          font-weight: 700;
          font-size: 28px;
          color: #b30000;
          letter-spacing: 1.2px;
        }

        input, select {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 2px solid #b30000;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #ff4d4d;
          box-shadow: 0 0 8px #ff4d4d;
        }

        select {
          cursor: pointer;
        }

        button[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: #b30000;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 5px 12px rgba(179, 0, 0, 0.4);
        }

        button[type="submit"]:hover {
          background-color: #ff1a1a;
          box-shadow: 0 7px 15px rgba(255, 26, 26, 0.7);
        }

        @media (max-width: 480px) {
          form {
            padding: 30px 25px;
          }
          h2 {
            font-size: 24px;
          }
          button[type="submit"] {
            font-size: 16px;
          }
        }

        .register-link {
          margin-top: 18px;
          font-size: 15px;
          color: #b30000;
        }

        .register-link button {
          background: none;
          border: none;
          color: #ff4d4d;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
          margin-left: 5px;
          font-size: 15px;
          transition: color 0.3s ease;
        }

        .register-link button:hover {
          color: #b30000;
        }
      `}</style>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Registro de Usuario</h2>
          <input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <select name="role" value={formData.role} onChange={handleChange} aria-label="Seleccionar rol">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" aria-label="Registrarse">Registrarse</button>

          <div className="register-link">
            <br></br>
            ¿Ya tienes cuenta?
            <button type="button" onClick={() => navigate('/login')} aria-label="Iniciar Sesión">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
