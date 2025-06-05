// src/pages/DocentePage.jsx
import React, { useState, useEffect } from 'react';
import PG from "./PG"; // Importa tu página principal

const DocentePage = () => {
  // Usuario desde localStorage y estado para controlar sesión
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [user, setUser] = useState(storedUser);

  // Obtener opciones y cursos desde localStorage
  const careerOptions = JSON.parse(localStorage.getItem('careerOptions')) || [];
  const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};

  // Datos guardados específicos del docente en localStorage (carrera, foto, contenido)
  const savedData = JSON.parse(localStorage.getItem('docenteData')) || {};

  // Estados
  const [career, setCareer] = useState(savedData.career || '');
  const [askingForPassword, setAskingForPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [photo, setPhoto] = useState(savedData.photo || null); // base64 string o null
  const [selectedTab, setSelectedTab] = useState('inicio'); // 'inicio' | 'modulos'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState(savedData.courseContent || {});

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(
      'docenteData',
      JSON.stringify({ career, photo, courseContent })
    );
  }, [career, photo, courseContent]);

  // Funciones
  const handleSelectCareer = () => {
    if (!career) {
      alert('Por favor, selecciona una carrera primero');
      return;
    }
    setCareer(career);
    setAskingForPassword(false);
    setErrorPass('');
  };

  const tryChangeCareer = () => {
    // Al querer cambiar carrera, pide contraseña
    setAskingForPassword(true);
    setPasswordInput('');
    setErrorPass('');
  };

  const verifyPasswordAndChangeCareer = () => {
    // Compara contraseña (supongo que user.password existe en localStorage)
    if (passwordInput === user.password) {
      setCareer('');
      setAskingForPassword(false);
      setErrorPass('');
      setSelectedCourse(null);
      setCourseContent({});
      alert('Puedes elegir una nueva carrera ahora');
    } else {
      setErrorPass('Contraseña incorrecta');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Al subir archivo en semana
  const handleFileChange = (course, week, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      setCourseContent(prev => ({
        ...prev,
        [course]: {
          ...(prev[course] || {}),
          [week]: {
            name: file.name,
            type: file.type,
            base64,
          }
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = (fileData) => {
    if (!fileData) return;
    const link = document.createElement('a');
    link.href = fileData.base64;
    link.download = fileData.name;
    link.click();
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('docenteData');
    setUser(null); // Actualiza estado para redirigir a PG
  };

  // Si no hay usuario o el rol no es profesor, redirige a PG (página principal)
  if (!user || user.role !== 'profesor') {
    return <PG />;
  }

  // Render
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f4f4f9' }}>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          backgroundColor: '#34495e',
          padding: '10px 20px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Docente</div>
        <div>
          <button
            onClick={() => { setSelectedTab('inicio'); setSelectedCourse(null); }}
            style={{
              marginRight: '15px',
              backgroundColor: selectedTab === 'inicio' ? '#2ecc71' : 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '6px 12px',
              borderRadius: '4px',
            }}
          >
            Inicio
          </button>
          <button
            onClick={() => { setSelectedTab('modulos'); setSelectedCourse(null); }}
            style={{
              backgroundColor: selectedTab === 'modulos' ? '#2ecc71' : 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '6px 12px',
              borderRadius: '4px',
              marginRight: '15px',
            }}
          >
            Módulos
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '6px 12px',
              borderRadius: '4px',
            }}
            title="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
        <h2>Bienvenido, profesor {user.name}</h2>

        {/* Foto de perfil */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Foto de perfil</h3>
          {photo ? (
            <img
              src={photo}
              alt="Foto de perfil"
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#bdc3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7f8c8d',
              }}
            >
              Sin foto
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ marginTop: '10px' }}
          />
        </div>

        {/* Selección y cambio de carrera */}
        <div style={{ marginBottom: '30px' }}>
          {!career ? (
            <>
              <h3>Selecciona la carrera que enseñas</h3>
              <select
                value={career}
                onChange={e => setCareer(e.target.value)}
                style={{ fontSize: '16px', padding: '6px', minWidth: '200px' }}
              >
                <option value="">-- Seleccionar --</option>
                {careerOptions.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <br />
              <button
                onClick={handleSelectCareer}
                style={{
                  marginTop: '10px',
                  padding: '8px 14px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Confirmar Carrera
              </button>
            </>
          ) : (
            <>
              <h3>Tu carrera asignada: <span style={{ color: '#2980b9' }}>{career}</span></h3>
              <button
                onClick={tryChangeCareer}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  backgroundColor: '#c0392b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  marginTop: '8px',
                }}
              >
                Cambiar carrera
              </button>

              {askingForPassword && (
                <div style={{ marginTop: '15px' }}>
                  <label>
                    Ingresa tu contraseña para cambiar carrera:
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      style={{ marginLeft: '10px', padding: '6px', fontSize: '14px' }}
                    />
                  </label>
                  <button
                    onClick={verifyPasswordAndChangeCareer}
                    style={{
                      marginLeft: '10px',
                      padding: '6px 12px',
                      backgroundColor: '#2980b9',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    Verificar
                  </button>
                  {errorPass && (
                    <div style={{ color: 'red', marginTop: '8px' }}>{errorPass}</div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Contenido según pestaña */}
        {selectedTab === 'inicio' && (
          <section>
            <h3>Información de inicio</h3>
            <p>Bienvenido a la página del docente. Aquí puedes gestionar tus cursos y materiales.</p>
          </section>
        )}

        {selectedTab === 'modulos' && career && (
          <section>
            <h3>Módulos y cursos de la carrera {career}</h3>
            <div style={{ display: 'flex' }}>
              {/* Lista de cursos */}
              <aside
                style={{
                  width: '30%',
                  borderRight: '1px solid #ccc',
                  paddingRight: '15px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <h4>Cursos</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {(coursesByCareer[career] || []).map((course, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>
                      <button
                        onClick={() => setSelectedCourse(course)}
                        style={{
                          backgroundColor: selectedCourse === course ? '#3498db' : '#ecf0f1',
                          color: selectedCourse === course ? 'white' : 'black',
                          border: 'none',
                          width: '100%',
                          padding: '8px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      >
                        {course}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Detalle curso seleccionado */}
              <div style={{ width: '70%', paddingLeft: '20px' }}>
                {selectedCourse ? (
                  <>
                    <h4>Contenido del curso: {selectedCourse}</h4>
                    {/* Asumimos 4 semanas */}
                    {[1, 2, 3, 4].map(week => (
                      <div key={week} style={{ marginBottom: '15px' }}>
                        <h5>Semana {week}</h5>
                        <input
                          type="file"
                          onChange={e => handleFileChange(selectedCourse, week, e)}
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,image/*,video/*"
                          style={{ marginBottom: '6px' }}
                        />
                        {courseContent[selectedCourse]?.[week] && (
                          <div>
                            <p>Archivo: {courseContent[selectedCourse][week].name}</p>
                            <button
                              onClick={() => handleDownload(courseContent[selectedCourse][week])}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Descargar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Selecciona un curso para ver su contenido.</p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DocentePage;
