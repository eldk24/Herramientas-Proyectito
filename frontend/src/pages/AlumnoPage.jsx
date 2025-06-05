// src/pages/AlumnoPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlumnoPage = () => {
  const [user, setUser] = useState(null);
  const [career, setCareer] = useState('');
  const [photo, setPhoto] = useState('');
  const [careerOptions, setCareerOptions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contentByWeek, setContentByWeek] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'estudiante') {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const options = JSON.parse(localStorage.getItem('careerOptions')) || [];
    setCareerOptions(options);

    if (currentUser.career) {
      setCareer(currentUser.career);
      const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};
      setCourses(coursesByCareer[currentUser.career] || []);
      loadContent(currentUser.career);
    }
  }, [navigate]);

  const handleCareerSelect = (e) => {
    const selected = e.target.value;
    setCareer(selected);
    const updatedUser = { ...user, career: selected };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};
    setCourses(coursesByCareer[selected] || []);
    loadContent(selected);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      const updatedUser = { ...user, photo: reader.result };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
    if (file) reader.readAsDataURL(file);
  };

  const loadContent = (career) => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const filtered = uploadedFiles.filter(f => f.career === career);

    const weeks = {};
    for (let i = 1; i <= 18; i++) weeks[`Semana ${i}`] = [];

    filtered.forEach(file => {
      const weekKey = file.description?.trim() || 'Semana 1';
      if (weeks[weekKey]) {
        weeks[weekKey].push(file);
      }
    });
    setContentByWeek(weeks);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial',
      maxWidth: '900px',
      margin: 'auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>👨‍🎓 Bienvenido, {user.name}</h2>
        <button
          onClick={cerrarSesion}
          style={{
            backgroundColor: '#d9534f',
            border: 'none',
            color: 'white',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <p><strong>Correo:</strong> {user.email}</p>

      <div>
        <strong>Carrera:</strong>
        {career ? (
          <span> {career}</span>
        ) : (
          <select onChange={handleCareerSelect} defaultValue="">
            <option value="" disabled>Selecciona tu carrera</option>
            {careerOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Foto de perfil:</strong><br />
        {(photo || user.photo) && (
          <img
            src={photo || user.photo}
            alt="Perfil"
            width={100}
            height={100}
            style={{ borderRadius: '50%', marginTop: '8px' }}
          />
        )}
        <br />
        <input type="file" onChange={handlePhotoUpload} accept="image/*" />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>📘 Mis Cursos</h3>
        <ul>
          {courses.map(c => <li key={c}>{c}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>🗂 Contenido por Semana</h3>
        {Object.entries(contentByWeek).map(([week, files]) => (
          <div key={week} style={{ marginBottom: '15px' }}>
            <h4>{week}</h4>
            {files.length > 0 ? (
              <ul>
                {files.map(f => (
                  <li key={f.id}>
                    <strong>{f.course}</strong>: <a href={URL.createObjectURL(new Blob([f.fileName]))} download>{f.fileName}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin archivos esta semana.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumnoPage;
