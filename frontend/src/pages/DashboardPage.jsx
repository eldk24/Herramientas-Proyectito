import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../Estilos/Dashboard.css';

const careerOptions = [
  'Ing. Sistemas',
  'Psicología',
  'Arquitectura',
  'Derecho'
];

const coursesByCareer = {
  'Ing. Sistemas': ['Principios de Algoritmos', 'Taller de Programación', 'Base de Datos', 'JavaScript Avanzado'],
  'Psicología': ['Personalidad', 'Motivación', 'Pruebas Psicológicas', 'Diagnóstico'],
  'Arquitectura': ['Dibujo', 'Pintura y Escultura', 'Construcción 1', 'Construcción 2'],
  'Derecho': ['Derechos Humanos', 'Derecho Público', 'Ciencia Política', 'Derecho Penal'],
};

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [career, setCareer] = useState(user?.career || '');
  const [courses, setCourses] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(user?.career || '');
  const [adminUsers, setAdminUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  });
  const [newCareer, setNewCareer] = useState('');
  const [newCourseCareer, setNewCourseCareer] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('alumno');
  const [newUserCareer, setNewUserCareer] = useState('');

  useEffect(() => {
    if (career) {
      setCourses(coursesByCareer[career] || []);
    }
  }, [career]);

  if (!user) {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title denied">Acceso denegado</h2>
          <p className="dashboard-text">No hay usuario autenticado. Por favor, inicia sesión.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  const handleCareerSelect = () => {
    if (!career) return alert('Selecciona una carrera');
    const updatedUser = { ...user, career };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSelectedCareer(career);
  };

  const handleAddCareer = () => {
    if (!newCareer.trim()) return alert('Ingresa el nombre de la nueva carrera');
    if (careerOptions.includes(newCareer)) return alert('La carrera ya existe');
    careerOptions.push(newCareer);
    alert(`Carrera "${newCareer}" agregada.`);
    setNewCareer('');
  };

  const handleAddCourse = () => {
    if (!newCourseCareer || !newCourseName.trim()) return alert('Completa la carrera y el nombre del curso');
    if (!careerOptions.includes(newCourseCareer)) return alert('La carrera no existe');
    if (!coursesByCareer[newCourseCareer]) coursesByCareer[newCourseCareer] = [];
    if (coursesByCareer[newCourseCareer].includes(newCourseName)) return alert('El curso ya existe en esa carrera');
    coursesByCareer[newCourseCareer].push(newCourseName);
    alert(`Curso "${newCourseName}" agregado a "${newCourseCareer}".`);
    setNewCourseCareer('');
    setNewCourseName('');
  };

  const handleAddUser = () => {
    if (!newUserName.trim()) return alert('Ingresa el nombre del usuario');
    if (!['admin', 'docente', 'alumno'].includes(newUserRole)) return alert('Rol inválido');
    if ((newUserRole === 'docente' || newUserRole === 'alumno') && !newUserCareer) {
      return alert('Selecciona la carrera para el usuario');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.name === newUserName)) return alert('El usuario ya existe');

    const newUser = {
      name: newUserName,
      role: newUserRole,
      career: (newUserRole === 'docente' || newUserRole === 'alumno') ? newUserCareer : '',
      courses: (newUserRole === 'docente' || newUserRole === 'alumno') ? (coursesByCareer[newUserCareer] || []) : [],
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Usuario "${newUserName}" agregado.`);
    setNewUserName('');
    setNewUserRole('alumno');
    setNewUserCareer('');
    setAdminUsers(users);
  };

  const handleDeleteUser = (name) => {
    if (!window.confirm(`¿Seguro que quieres eliminar al usuario "${name}"?`)) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(u => u.name !== name);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    alert(`Usuario "${name}" eliminado.`);
    setAdminUsers(filteredUsers);
  };

  if (user.role === 'admin') {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
          <p className="dashboard-role">Rol: Admin</p>

          <div className="dashboard-message">Tienes acceso a funciones de administración del sistema.</div>

          <h3>Agregar nueva carrera</h3>
          <input type="text" placeholder="Nombre de la carrera" value={newCareer} onChange={(e) => setNewCareer(e.target.value)} />
          <button onClick={handleAddCareer}>Agregar carrera</button>

          <h3>Agregar nuevo curso a una carrera</h3>
          <select value={newCourseCareer} onChange={(e) => setNewCourseCareer(e.target.value)}>
            <option value="">Selecciona una carrera</option>
            {careerOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input type="text" placeholder="Nombre del curso" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
          <button onClick={handleAddCourse}>Agregar curso</button>

          <h3>Agregar usuario</h3>
          <input type="text" placeholder="Nombre de usuario" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
            <option value="alumno">Alumno</option>
            <option value="docente">Docente</option>
            <option value="admin">Admin</option>
          </select>
          {(newUserRole === 'docente' || newUserRole === 'alumno') && (
            <select value={newUserCareer} onChange={(e) => setNewUserCareer(e.target.value)}>
              <option value="">Selecciona carrera</option>
              {careerOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
          <button onClick={handleAddUser}>Agregar usuario</button>

          <h3>Usuarios registrados</h3>
          <ul>
            {adminUsers.map(u => (
              <li key={u.name}>
                {u.name} - {u.role} {u.career && `- ${u.career}`}
                {u.name !== user.name && (
                  <button style={{ marginLeft: '10px' }} onClick={() => handleDeleteUser(u.name)}>
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    );
  }

  if (user.role === 'docente' || user.role === 'alumno') {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
          <p className="dashboard-role">Rol: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>

          {!selectedCareer ? (
            <>
              <p>Selecciona tu carrera (No podrá cambiarse luego):</p>
              <select value={career} onChange={(e) => setCareer(e.target.value)}>
                <option value="">Selecciona una carrera</option>
                {careerOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <br /><br />
              <button onClick={handleCareerSelect}>Guardar carrera</button>
            </>
          ) : (
            <>
              <p>Carrera: <strong>{selectedCareer}</strong></p>
              <h3>Cursos disponibles:</h3>
              <ul>
                {courses.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}

          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardPage;
