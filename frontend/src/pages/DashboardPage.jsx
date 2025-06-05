import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
<<<<<<< HEAD
import '../Estilos/Dashboard.css'; // Ajusta la ruta según tu proyecto
import { useNavigate } from 'react-router-dom';

// Valores iniciales para las carreras y cursos
const initialCareerOptions = [
=======
import '../Estilos/Dashboard.css';

const careerOptions = [
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  'Ing. Sistemas',
  'Psicología',
  'Arquitectura',
  'Derecho'
];

<<<<<<< HEAD
const initialCoursesByCareer = {
=======
const coursesByCareer = {
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  'Ing. Sistemas': ['Principios de Algoritmos', 'Taller de Programación', 'Base de Datos', 'JavaScript Avanzado'],
  'Psicología': ['Personalidad', 'Motivación', 'Pruebas Psicológicas', 'Diagnóstico'],
  'Arquitectura': ['Dibujo', 'Pintura y Escultura', 'Construcción 1', 'Construcción 2'],
  'Derecho': ['Derechos Humanos', 'Derecho Público', 'Ciencia Política', 'Derecho Penal'],
};

const DashboardPage = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Estado para opciones de carrera y cursos por carrera, cargados o con valores iniciales
  const [careerOptions, setCareerOptions] = useState(() => {
    const storedCareers = JSON.parse(localStorage.getItem('careerOptions'));
    return storedCareers && storedCareers.length > 0 ? storedCareers : initialCareerOptions;
  });

  const [coursesByCareer, setCoursesByCareer] = useState(() => {
    const storedCourses = JSON.parse(localStorage.getItem('coursesByCareer'));
    return storedCourses && Object.keys(storedCourses).length > 0 ? storedCourses : initialCoursesByCareer;
  });

  // Usuarios admin (cargados de localStorage)
=======
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [career, setCareer] = useState(user?.career || '');
  const [courses, setCourses] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(user?.career || '');
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  const [adminUsers, setAdminUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  });
<<<<<<< HEAD

  // Estados para selección de carrera y cursos del usuario actual
  const [career, setCareer] = useState(user?.career || '');
  const [selectedCareer, setSelectedCareer] = useState(user?.career || '');
  const [courses, setCourses] = useState([]);

  // Estados para agregar nuevas carreras, cursos y usuarios (admin)
=======
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  const [newCareer, setNewCareer] = useState('');
  const [newCourseCareer, setNewCourseCareer] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('alumno');
  const [newUserCareer, setNewUserCareer] = useState('');

<<<<<<< HEAD
  // Actualiza la lista de cursos cuando cambia la carrera seleccionada
  useEffect(() => {
    if (career && coursesByCareer[career]) {
      setCourses(coursesByCareer[career]);
    } else {
      setCourses([]);
    }
  }, [career, coursesByCareer]);

  // Si no hay usuario autenticado
=======
  useEffect(() => {
    if (career) {
      setCourses(coursesByCareer[career] || []);
    }
  }, [career]);

>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
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
<<<<<<< HEAD
    navigate('/login');
  };

  // Guardar carrera para docente o alumno, una sola vez
=======
    window.location.href = '/login';
  };

>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  const handleCareerSelect = () => {
    if (!career) return alert('Selecciona una carrera');
    const updatedUser = { ...user, career };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSelectedCareer(career);
  };

<<<<<<< HEAD
  // Agregar carrera (solo para admin)
  const handleAddCareer = () => {
    if (!newCareer.trim()) return alert('Ingresa el nombre de la nueva carrera');
    if (careerOptions.includes(newCareer)) return alert('La carrera ya existe');

    const updatedCareers = [...careerOptions, newCareer];
    setCareerOptions(updatedCareers);
    localStorage.setItem('careerOptions', JSON.stringify(updatedCareers));

    const updatedCoursesByCareer = { ...coursesByCareer, [newCareer]: [] };
    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

=======
  const handleAddCareer = () => {
    if (!newCareer.trim()) return alert('Ingresa el nombre de la nueva carrera');
    if (careerOptions.includes(newCareer)) return alert('La carrera ya existe');
    careerOptions.push(newCareer);
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
    alert(`Carrera "${newCareer}" agregada.`);
    setNewCareer('');
  };

<<<<<<< HEAD
  // Agregar curso a carrera (solo para admin)
  const handleAddCourse = () => {
    if (!newCourseCareer || !newCourseName.trim()) return alert('Completa la carrera y el nombre del curso');
    if (!careerOptions.includes(newCourseCareer)) return alert('La carrera no existe');

    const updatedCourses = [...(coursesByCareer[newCourseCareer] || []), newCourseName];
    const updatedCoursesByCareer = { ...coursesByCareer, [newCourseCareer]: updatedCourses };

    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

=======
  const handleAddCourse = () => {
    if (!newCourseCareer || !newCourseName.trim()) return alert('Completa la carrera y el nombre del curso');
    if (!careerOptions.includes(newCourseCareer)) return alert('La carrera no existe');
    if (!coursesByCareer[newCourseCareer]) coursesByCareer[newCourseCareer] = [];
    if (coursesByCareer[newCourseCareer].includes(newCourseName)) return alert('El curso ya existe en esa carrera');
    coursesByCareer[newCourseCareer].push(newCourseName);
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
    alert(`Curso "${newCourseName}" agregado a "${newCourseCareer}".`);
    setNewCourseCareer('');
    setNewCourseName('');
  };

<<<<<<< HEAD
  // Agregar usuario (solo para admin)
=======
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
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

<<<<<<< HEAD
  // Eliminar usuario (solo admin)
=======
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  const handleDeleteUser = (name) => {
    if (!window.confirm(`¿Seguro que quieres eliminar al usuario "${name}"?`)) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(u => u.name !== name);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    alert(`Usuario "${name}" eliminado.`);
    setAdminUsers(filteredUsers);
  };

<<<<<<< HEAD
  // Vistas según el rol del usuario
=======
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  if (user.role === 'admin') {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
          <p className="dashboard-role">Rol: Admin</p>

          <div className="dashboard-message">Tienes acceso a funciones de administración del sistema.</div>

          <h3>Agregar nueva carrera</h3>
<<<<<<< HEAD
          <input
            type="text"
            placeholder="Nombre de la carrera"
            value={newCareer}
            onChange={(e) => setNewCareer(e.target.value)}
          />
=======
          <input type="text" placeholder="Nombre de la carrera" value={newCareer} onChange={(e) => setNewCareer(e.target.value)} />
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
          <button onClick={handleAddCareer}>Agregar carrera</button>

          <h3>Agregar nuevo curso a una carrera</h3>
          <select value={newCourseCareer} onChange={(e) => setNewCourseCareer(e.target.value)}>
            <option value="">Selecciona una carrera</option>
            {careerOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
<<<<<<< HEAD
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
=======
          <input type="text" placeholder="Nombre del curso" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
          <button onClick={handleAddCourse}>Agregar curso</button>

          <h3>Agregar usuario</h3>
          <input type="text" placeholder="Nombre de usuario" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
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

<<<<<<< HEAD
          <h3>Lista de usuarios</h3>
          {adminUsers.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ul>
              {adminUsers.map((u) => (
                <li key={u.name}>
                  {u.name} - {u.role} {u.career && `- Carrera: ${u.career}`}
                  <button onClick={() => handleDeleteUser(u.name)} style={{ marginLeft: '10px' }}>Eliminar</button>
                </li>
              ))}
            </ul>
          )}

          <button onClick={handleLogout}>Cerrar sesión</button>
=======
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
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  // Docentes y alumnos seleccionan o ven su carrera y cursos
=======
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
  if (user.role === 'docente' || user.role === 'alumno') {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
<<<<<<< HEAD
          <p className="dashboard-role">Rol: {user.role === 'docente' ? 'Docente' : 'Alumno'}</p>

          {!selectedCareer ? (
            <>
              <p>Selecciona tu carrera para continuar:</p>
              <select value={career} onChange={(e) => setCareer(e.target.value)}>
                <option value="">Selecciona una carrera</option>
                {careerOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
=======
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
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
              <button onClick={handleCareerSelect}>Guardar carrera</button>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <p>Tu carrera: <strong>{selectedCareer}</strong></p>
              <h3>Cursos de la carrera</h3>
              {courses.length === 0 ? (
                <p>No hay cursos disponibles para esta carrera.</p>
              ) : (
                <ul>
                  {courses.map((course, idx) => (
                    <li key={idx}>{course}</li>
                  ))}
                </ul>
              )}
            </>
          )}

          <button onClick={handleLogout}>Cerrar sesión</button>
=======
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
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  // Para cualquier otro rol, acceso denegado
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title denied">Acceso denegado</h2>
        <p className="dashboard-text">Tu rol no tiene acceso a esta página.</p>
      </div>
    </div>
  );
=======
  return null;
>>>>>>> ca0dafac6c7a2db4d1e457e07e98d5c0e9f35405
};

export default DashboardPage;
