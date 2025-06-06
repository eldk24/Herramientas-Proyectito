import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const SearchPage = () => {
  // Estado para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro por curso (basado en archivos guardados en localStorage)
  const [courseFilter, setCourseFilter] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [allFiles, setAllFiles] = useState([]); // Archivos guardados localmente

  // Filtro por categoría (simulado con datos fijos)
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  // Resultados y estados
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar archivos guardados y extraer cursos únicos
  useEffect(() => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setAllFiles(parsedFiles);

      const uniqueCourses = [...new Set(parsedFiles.map(f => f.course))];
      setAvailableCourses(uniqueCourses);
    }
  }, []);

  // Cargar categorías (simulado)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesFromApi = ['Matemáticas', 'Ciencias', 'Lenguaje', 'Historia', 'Programación'];
        setAvailableCategories(categoriesFromApi);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setError('Error al cargar las categorías.');
      }
    };

    fetchCategories();
  }, []);

  // Handlers
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleCourseFilterChange = (e) => setCourseFilter(e.target.value);
  const handleCategoryFilterChange = (e) => setCategoryFilter(e.target.value);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      // Simular retardo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filtrar archivos guardados según searchTerm y courseFilter
      const filteredFiles = allFiles.filter(file =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (courseFilter === '' || file.course === courseFilter)
      );

      // Filtrar recursos simulados según searchTerm y categoryFilter
      const fakeResources = [
        { id: 1, title: 'Introducción al Álgebra', category: 'Matemáticas', description: 'Conceptos básicos de álgebra.' },
        { id: 2, title: 'La fotosíntesis', category: 'Ciencias', description: 'Proceso fundamental para la vida.' },
        { id: 3, title: 'Análisis literario de "El Quijote"', category: 'Lenguaje', description: 'Profundización en la obra de Cervantes.' },
        { id: 4, title: 'La Revolución Francesa', category: 'Historia', description: 'Causas y consecuencias del evento histórico.' },
        { id: 5, title: 'Bucles en JavaScript', category: 'Programación', description: 'Cómo utilizar bucles for y while.' },
      ].filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || resource.category === categoryFilter)
      );

      // Combinar resultados de archivos y recursos (opcional: puedes decidir cómo mostrarlos)
      const combinedResults = [
        ...filteredFiles.map(file => ({
          id: file.id || file.fileName, // fallback si no tiene id
          title: file.fileName,
          category: file.course,
          description: file.description || '-',
          uploadDate: file.uploadDate,
          isFile: true,
        })),
        ...fakeResources.map(res => ({
          id: res.id,
          title: res.title,
          category: res.category,
          description: res.description,
          isFile: false,
        })),
      ];

      setSearchResults(combinedResults);
    } catch (err) {
      console.error('Error al buscar recursos:', err);
      setError('Hubo un error al buscar los recursos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Estilos modernos y limpios
  const styles = {
    page: { backgroundColor: 'rgb(255, 178, 178)', minHeight: '100vh', color: '#fff', paddingBottom: '40px' },
    container: {
      maxWidth: '700px',
      margin: '30px auto',
      padding: '25px 30px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      color: '#000',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: { textAlign: 'center', color: '#dc3545', fontWeight: 'bold', fontSize: '2rem', marginBottom: '25px' },
    label: { display: 'block', marginBottom: '8px', fontWeight: '600' },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1.5px solid #ccc',
      marginBottom: '20px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1.5px solid #ccc',
      marginBottom: '20px',
      outline: 'none',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#dc3545',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      transition: 'background-color 0.3s ease',
      userSelect: 'none',
    },
    buttonDisabled: {
      backgroundColor: '#f7a6a6',
      cursor: 'not-allowed',
    },
    error: {
      marginTop: '20px',
      color: 'red',
      textAlign: 'center',
      fontWeight: '600',
    },
    noResults: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#555',
    },
    table: {
      width: '100%',
      marginTop: '20px',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '10px',
      border: '1px solid #ccc',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      border: '1px solid #ccc',
      verticalAlign: 'top',
    },
    date: { whiteSpace: 'nowrap' },
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Buscar Recursos</h2>

        <div>
          <label style={styles.label}>Buscar por nombre de archivo o título:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Ej: algebra_basica.pdf o Introducción al Álgebra"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Filtrar por curso (archivos):</label>
          <select value={courseFilter} onChange={handleCourseFilterChange} style={styles.select}>
            <option value="">Todos los cursos</option>
            {availableCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Filtrar por categoría (recursos):</label>
          <select value={categoryFilter} onChange={handleCategoryFilterChange} style={styles.select}>
            <option value="">Todas las categorías</option>
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {!loading && searchResults.length === 0 && <p style={styles.noResults}>No se encontraron resultados.</p>}

        {searchResults.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Título / Archivo</th>
                <th style={styles.th}>Categoría / Curso</th>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Fecha de Subida</th>
                <th style={styles.th}>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(result => (
                <tr key={result.id}>
                  <td style={styles.td}>{result.title}</td>
                  <td style={styles.td}>{result.category}</td>
                  <td style={styles.td}>{result.description}</td>
                  <td style={{ ...styles.td, ...styles.date }}>{result.uploadDate || '-'}</td>
                  <td style={styles.td}>{result.isFile ? 'Archivo' : 'Recurso'}</td>
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
