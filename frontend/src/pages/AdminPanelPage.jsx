import React from 'react';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f3f4f6;
          color: #1f2937;
        }

        .admin-container {
          max-width: 768px;
          margin: 0 auto;
          padding: 24px;
        }

        .admin-header {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
          text-align: center;
        }

        .user-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .user-item {
          background-color: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          transition: background-color 0.2s ease-in-out;
        }

        .user-item:hover {
          background-color: #f9fafb;
        }

        .user-email {
          font-weight: 500;
        }

        .user-role {
          font-size: 14px;
          color: #6b7280;
        }
      `}</style>

      <div className="admin-wrapper">
        <Navbar />
        <div className="admin-container">
          <h2 className="admin-header">Administración de Permisos</h2>
          <ul className="user-list">
            {users.map((u, index) => (
              <li key={index} className="user-item">
                <span className="user-email">{u.email}</span>
                <span className="user-role">Rol: {u.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
