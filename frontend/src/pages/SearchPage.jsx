import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

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

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  const handleCategoryFilterChange = (event) => setCategoryFilter(event.target.value);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeResults = [
        { id: 1, title: 'Introducción al Álgebra', category: 'Matemáticas', description: 'Conceptos básicos de álgebra.' },
        { id: 2, title: 'La fotosíntesis', category: 'Ciencias', description: 'Proceso fundamental para la vida.' },
        { id: 3, title: 'Análisis literario de "El Quijote"', category: 'Lenguaje', description: 'Profundización en la obra de Cervantes.' },
        { id: 4, title: 'La Revolución Francesa', category: 'Historia', description: 'Causas y consecuencias del evento histórico.' },
        { id: 5, title: 'Bucles en JavaScript', category: 'Programación', description: 'Cómo utilizar bucles for y while.' },
      ].filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || resource.category === categoryFilter)
      );

      setSearchResults(fakeResults);
    } catch (error) {
      console.error('Error al buscar recursos:', error);
      setError('Hubo un error al buscar los recursos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Estilos mejorados
  const styles = {
    container: {
      maxWidth: '700px',
      margin: '30px auto',
      padding: '25px 30px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '10px',
      fontWeight: '700',
      color: '#222',
    },
    subheading: {
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '1rem',
      color: '#666',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1.8px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    },
    inputFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 6px #a0c8ff',
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1.8px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '16px 16px',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '14px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 10px rgba(0,123,255,0.3)',
      userSelect: 'none',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      boxShadow: '0 6px 15px rgba(0,86,179,0.5)',
    },
    buttonDisabled: {
      backgroundColor: '#a3c0ff',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    loading: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#007bff',
      fontWeight: '600',
      fontSize: '1.1rem',
    },
    error: {
      marginTop: '20px',
      color: '#d9534f',
      fontWeight: '700',
      textAlign: 'center',
      fontSize: '1rem',
    },
    resultsContainer: {
      marginTop: '30px',
    },
    resultsHeading: {
      fontSize: '1.5rem',
      marginBottom: '15px',
      color: '#222',
      fontWeight: '700',
      borderBottom: '2px solid #007bff',
      paddingBottom: '5px',
    },
    resultsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      backgroundColor: '#f5f9ff',
      borderRadius: '8px',
      padding: '15px 20px',
      marginBottom: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      transition: 'background-color 0.2s ease',
      cursor: 'default',
    },
    listItemHover: {
      backgroundColor: '#e1ecff',
    },
    resourceTitle: {
      fontWeight: '700',
      fontSize: '1.1rem',
      marginBottom: '5px',
      color: '#0056b3',
    },
    resourceCategory: {
      fontStyle: 'italic',
      color: '#777',
      marginBottom: '8px',
      fontSize: '0.9rem',
    },
    resourceDescription: {
      color: '#444',
      fontSize: '1rem',
      lineHeight: '1.4',
    },
    noResults: {
      marginTop: '25px',
      fontSize: '1.1rem',
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
    },
  };

  // Añadí uso de estados para hover del botón y de items (opcional)
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>Buscar Recursos</h2>
      <p style={styles.subheading}>Filtra y encuentra recursos existentes.</p>

      <div style={styles.inputGroup}>
        <label htmlFor="searchTerm" style={styles.label}>Buscar por título o descripción:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Ej: Álgebra, fotosíntesis..."
          style={styles.input}
          autoComplete="off"
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="categoryFilter" style={styles.label}>Filtrar por categoría:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          style={styles.select}
        >
          <option value="">Todas las categorías</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          ...styles.button,
          ...(buttonHover ? styles.buttonHover : {}),
          ...(loading ? styles.buttonDisabled : {}),
        }}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <div style={styles.error}>{error}</div>}

      {loading && !error && <div style={styles.loading}>Cargando resultados...</div>}

      {searchResults.length > 0 && !loading && !error && (
        <div style={styles.resultsContainer}>
          <h3 style={styles.resultsHeading}>Resultados de la búsqueda:</h3>
          <ul style={styles.resultsList}>
            {searchResults.map((resource) => (
              <li key={resource.id} style={styles.listItem}>
                <div style={styles.resourceTitle}>{resource.title}</div>
                <div style={styles.resourceCategory}>{resource.category}</div>
                <div style={styles.resourceDescription}>{resource.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.length === 0 && !loading && !error && searchTerm && (
        <div style={styles.noResults}>No se encontraron recursos que coincidan con tu búsqueda.</div>
      )}
    </div>
  );
};

export default SearchPage;
