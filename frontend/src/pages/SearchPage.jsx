import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [allFiles, setAllFiles] = useState([]); // Todos los archivos subidos

  useEffect(() => {
    // Leer los archivos guardados en localStorage
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setAllFiles(parsedFiles);

      // Extraer cursos únicos para el filtro (dinámico según archivos)
      const uniqueCourses = [...new Set(parsedFiles.map(f => f.course))];
      setAvailableCourses(uniqueCourses);
    }
  }, []);

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  const handleCourseFilterChange = (event) => setCourseFilter(event.target.value);

  const handleSearch = () => {
    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      // Filtrar los archivos según el término y curso seleccionado
      const filtered = allFiles.filter(file =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (courseFilter === '' || file.course === courseFilter)
      );

      // Simular retardo
      setTimeout(() => {
        setSearchResults(filtered);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error al buscar recursos:', error);
      setError('Hubo un error al buscar los recursos. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(255, 178, 178)', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <div style={{ maxWidth: '700px', margin: '30px auto', padding: '25px 30px', backgroundColor: '#fff', borderRadius: '10px', color: '#000' }}>
        <h2 style={{ textAlign: 'center', color: '#dc3545' }}>Buscar Recursos</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Buscar por nombre de archivo:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
            placeholder="Ej: algebra_basica.pdf"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Filtrar por curso:</label>
          <select
            value={courseFilter}
            onChange={handleCourseFilterChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
          >
            <option value="">Todos los cursos</option>
            {availableCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          style={{ width: '100%', padding: '12px', backgroundColor: '#dc3545', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {error && <p style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>{error}</p>}

        {!loading && searchResults.length === 0 && (
          <p style={{ marginTop: '20px', textAlign: 'center', color: '#555' }}>No se encontraron resultados.</p>
        )}

        {searchResults.length > 0 && (
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Archivo</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Curso</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Descripción</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(file => (
                <tr key={file.id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{file.fileName}</td>
                  <td style={{ padding: '10px' }}>{file.course}</td>
                  <td style={{ padding: '10px' }}>{file.description || '-'}</td>
                  <td style={{ padding: '10px' }}>{new Date(file.uploadDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
