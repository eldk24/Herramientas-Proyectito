// src/pages/ResourcesPage.jsx
import React, { useState, useEffect } from 'react';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem('resources')) || [];
    setResources(storedResources);
  }, []);

  useEffect(() => {
    setFilteredResources(
      resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, resources]);

  return (
    <div>
      <h2>Recursos Educativos</h2>
      <input
        type="text"
        placeholder="Buscar recursos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredResources.map((resource, index) => (
          <li key={index}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <p>Categoria: {resource.category}</p>
            <a href={resource.resourceUrl} target="_blank" rel="noopener noreferrer">Ver Recurso</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesPage;
