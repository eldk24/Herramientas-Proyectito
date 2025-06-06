import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Dashboard.css'; // Ajusta la ruta según tu proyecto

// Valores iniciales para las carreras y cursos
const initialCareerOptions = [
  'Ing. Sistemas',
  'Psicología',
  'Arquitectura',
  'Derecho',
];

const initialCoursesByCareer = {
  'Ing. Sistemas': ['Principios de Algoritmos', 'Taller de Programación', 'Base de Datos', 'JavaScript Avanzado'],
  Psicología: ['Personalidad', 'Motivación', 'Pruebas Psicológicas', 'Diagnóstico'],
  Arquitectura: ['Dibujo', 'Pintura y Escultura', 'Construcción 1', 'Construcción 2'],
  Derecho: ['Derechos Humanos', 'Derecho Público', 'Ciencia Política', 'Derecho Penal'],
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Estados para opciones y datos
  const [careerOptions, setCareerOptions] = useState(() => {
    const storedCareers = JSON.parse(localStorage.getItem('careerOptions'));
    return storedCareers && storedCareers.length > 0 ? storedCareers : initialCareerOptions;
  });

  const [coursesByCareer, setCoursesByCareer] = useState(() => {
    const storedCourses = JSON.parse(localStorage.getItem('coursesByCareer'));
    return storedCourses && Object.keys(storedCourses).length > 0 ? storedCourses : initialCoursesByCareer;
  });

  const [adminUsers, setAdminUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  });

  // Estados para el usuario actual
  const [career, setCareer] = useState(user?.career || '');
  const [courses, setCourses] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(user?.career || '');

  // Estados para agregar nuevas carreras, cursos y usuarios (admin)
  const [newCareer, setNewCareer] = useState('');
  const [newCourseCareer, setNewCourseCareer] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('alumno');
  const [newUserCareer, setNewUserCareer] = useState('');

  // Actualiza la lista de cursos cuando cambia la carrera seleccionada
  useEffect(() => {
    if (career && coursesByCareer[career]) {
      setCourses(coursesByCareer[career]);
    } else {
      setCourses([]);
    }
  }, [career, coursesByCareer]);

  // Redirige si no hay usuario autenticado
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
    navigate('/login');
  };

  const handleCareerSelect = () => {
    if (!career) return alert('Selecciona una carrera');
    const updatedUser = { ...user, career };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSelectedCareer(career);
  };

  // Agregar carrera (solo admin)
  const handleAddCareer = () => {
    if (!newCareer.trim()) return alert('Ingresa el nombre de la nueva carrera');
    if (careerOptions.includes(newCareer)) return alert('La carrera ya existe');

    const updatedCareers = [...careerOptions, newCareer];
    setCareerOptions(updatedCareers);
    localStorage.setItem('careerOptions', JSON.stringify(updatedCareers));

    const updatedCoursesByCareer = { ...coursesByCareer, [newCareer]: [] };
    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

    alert(`Carrera "${newCareer}" agregada.`);
    setNewCareer('');
  };

  // Agregar curso a carrera (solo admin)
  const handleAddCourse = () => {
    if (!newCourseCareer || !newCourseName.trim()) return alert('Completa la carrera y el nombre del curso');
    if (!careerOptions.includes(newCourseCareer)) return alert('La carrera no existe');

    const currentCourses = coursesByCareer[newCourseCareer] || [];
    if (currentCourses.includes(newCourseName)) return alert('El curso ya existe en esa carrera');

    const updatedCourses = [...currentCourses, newCourseName];
    const updatedCoursesByCareer = { ...coursesByCareer, [newCourseCareer]: updatedCourses };

    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

    alert(`Curso "${newCourseName}" agregado a "${newCourseCareer}".`);
    setNewCourseCareer('');
    setNewCourseName('');
  };

  // Agregar usuario (solo admin)
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

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Usuario "${newUserName}" agregado.`);
    setNewUserName('');
    setNewUserRole('alumno');
    setNewUserCareer('');
    setAdminUsers(updatedUsers);
  };

  // Eliminar usuario (solo admin)
  const handleDeleteUser = (name) => {
    if (!window.confirm(`¿Seguro que quieres eliminar al usuario "${name}"?`)) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(u => u.name !== name);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    alert(`Usuario "${name}" eliminado.`);
    setAdminUsers(filteredUsers);
  };

  // Render según rol
  if (user.role === 'admin') {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
          <p className="dashboard-role">Rol: Admin</p>

          <div className="dashboard-message">Tienes acceso a funciones de administración del sistema.</div>

          <h3>Agregar nueva carrera</h3>
          <input
            type="text"
            placeholder="Nombre de la carrera"
            value={newCareer}
            onChange={(e) => setNewCareer(e.target.value)}
          />
          <button onClick={handleAddCareer}>Agregar carrera</button>

          <h3>Agregar nuevo curso a una carrera</h3>
          <select value={newCourseCareer} onChange={(e) => setNewCourseCareer(e.target.value)}>
            <option value="">Selecciona una carrera</option>
            {careerOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre del curso"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
          <button onClick={handleAddCourse}>Agregar curso</button>

          <h3>Agregar usuario</h3>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
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

          <h3>Lista de usuarios</h3>
          <ul>
            {adminUsers.map((userItem) => (
              <li key={userItem.name}>
                {userItem.name} - {userItem.role} {userItem.career ? `(${userItem.career})` : ''}
                {userItem.name !== user.name && (
                  <button onClick={() => handleDeleteUser(userItem.name)}>Eliminar</button>
                )}
              </li>
            ))}
          </ul>

          <button onClick={handleLogout}>Cerrar sesión</button>
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
          <p className="dashboard-role">Rol: {user.role}</p>

          <h3>Selecciona tu carrera</h3>
          <select value={career} onChange={(e) => setCareer(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {careerOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={handleCareerSelect}>Seleccionar carrera</button>

          {selectedCareer && (
            <>
              <h3>Cursos disponibles en {selectedCareer}</h3>
              <ul>
                {coursesByCareer[selectedCareer]?.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </>
          )}

          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    );
  }

  // Si rol no está contemplado
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title denied">Rol no reconocido</h2>
        <p className="dashboard-text">Tu rol no tiene acceso a esta página.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default DashboardPage;

