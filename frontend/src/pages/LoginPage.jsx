// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || 'Credenciales inválidas');
      }

      alert(`👋 ¡Bienvenido, ${data.user.name}!`);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      navigate('/dashboard'); // o la ruta que tengas configurada
    } catch (err) {
      alert('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #b30000, #ff4d4d);
          font-family: 'Montserrat', sans-serif;
          padding: 20px;
        }

        .login-form {
          background: white;
          padding: 40px 35px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(179, 0, 0, 0.3);
          width: 100%;
          max-width: 420px;
          text-align: center;
          position: relative;
        }

        .login-form::before {
          content: 'UTP';
          position: absolute;
          top: -40px;
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
          font-family: 'Montserrat', sans-serif;
        }

        .login-form h2 {
          margin-bottom: 25px;
          font-weight: 700;
          font-size: 28px;
          color: #b30000;
          letter-spacing: 1.2px;
        }

        .login-form input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 2px solid #b30000;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .login-form input:focus {
          outline: none;
          border-color: #ff4d4d;
          box-shadow: 0 0 8px #ff4d4d;
        }

        .login-form button[type="submit"] {
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

        .login-form button[type="submit"]:hover {
          background-color: #ff1a1a;
          box-shadow: 0 7px 15px rgba(255, 26, 26, 0.7);
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

        /* Iconos simples con Unicode para input */
        .input-icon {
          position: relative;
          margin-bottom: 25px;
        }

        .input-icon input {
          padding-left: 40px;
        }

        .input-icon::before {
          content: attr(data-icon);
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #b30000;
          pointer-events: none;
          user-select: none;
        }

        @media (max-width: 480px) {
          .login-form {
            padding: 30px 25px;
          }
          .login-form h2 {
            font-size: 24px;
          }
          .login-form button[type="submit"] {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <h2>Iniciar Sesión</h2>

          <div className="input-icon" data-icon="📧">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-icon" data-icon="🔒">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" aria-label="Ingresar a la cuenta">Ingresar</button>

          <div className="register-link">
            ¿No tienes cuenta?
            <button type="button" onClick={() => navigate('/register')} aria-label="Crear cuenta">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

