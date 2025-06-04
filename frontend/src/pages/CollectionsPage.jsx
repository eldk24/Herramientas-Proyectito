import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulación de carga de colecciones del usuario desde el backend
    const fetchCollections = async () => {
      setLoading(true);
      setError('');
      try {
        // Reemplaza esto con tu llamada real a la API para obtener las colecciones del usuario
        await new Promise(resolve => setTimeout(resolve, 500));
        const userCollections = [
          { id: 1, name: 'Matemáticas Avanzadas', itemCount: 5 },
          { id: 2, name: 'Historia del Arte', itemCount: 12 },
          { id: 3, name: 'Programación en Python', itemCount: 8 },
        ];
        setCollections(userCollections);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar las colecciones:', err);
        setError('Error al cargar tus colecciones.');
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleInputChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      setError('El nombre de la colección no puede estar vacío.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Simulación de creación de una nueva colección en el backend
      await new Promise(resolve => setTimeout(resolve, 500));
      const newCollection = {
        id: Date.now(), // Simulación de ID
        name: newCollectionName,
        itemCount: 0,
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setLoading(false);
    } catch (err) {
      console.error('Error al crear la colección:', err);
      setError('Error al crear la colección. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const headingStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    color: '#555',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const createCollectionContainerStyle = {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const collectionsListStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const collectionItemStyle = {
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const collectionNameStyle = {
    fontWeight: 'bold',
    color: '#333',
  };

  const itemCountStyle = {
    color: '#777',
  };

  const errorStyle = {
    marginTop: '15px',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const loadingStyle = {
    marginTop: '15px',
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <h2 style={headingStyle}>Mis Colecciones</h2>
      <p style={paragraphStyle}>Organiza tus recursos en colecciones temáticas.</p>

      <div style={createCollectionContainerStyle}>
        <h3>Crear Nueva Colección</h3>
        <input
          type="text"
          placeholder="Nombre de la colección"
          value={newCollectionName}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <button onClick={handleCreateCollection} disabled={loading} style={buttonStyle}>
          {loading ? 'Creando...' : 'Crear'}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}
      {loading && !error && <div style={loadingStyle}>Cargando colecciones...</div>}

      <div>
        <h3>Mis Colecciones Existentes</h3>
        {collections.length > 0 ? (
          <ul style={collectionsListStyle}>
            {collections.map(collection => (
              <li key={collection.id} style={collectionItemStyle}>
                <span style={collectionNameStyle}>{collection.name}</span>
                <span style={itemCountStyle}>{collection.itemCount} recursos</span>
                {/* Aquí podrías agregar botones para ver, editar o eliminar la colección */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no has creado ninguna colección.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;