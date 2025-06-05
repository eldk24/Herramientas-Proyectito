import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSelectedFile(null);
    setCategory('');
    setDescription('');
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Por favor, selecciona un archivo.');
      return;
    }

    setUploadError('');
    setUploadSuccess(false);
    setLoading(true);

    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      setUploadSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setUploadError('Hubo un error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'rgb(255, 178, 178)',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <Navbar />
      <div className="container py-5">
        <div
          className="card shadow-lg mx-auto"
          style={{ maxWidth: '600px', borderTop: '5px solid #fff', backgroundColor: '#fff', color: '#000' }}
        >
          <div className="card-body">
            <h2 className="card-title text-center text-danger mb-3">Subir Recursos</h2>
            <p className="text-center text-muted mb-4">Aquí podrás subir y categorizar recursos educativos.</p>

            {/* Archivo */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Seleccionar Archivo</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="form-control"
              />
            </div>

            {/* Categoría */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Seleccionar categoría</option>
                <option value="matematicas">Matemáticas</option>
                <option value="ciencias">Ciencias</option>
                <option value="lenguaje">Lenguaje</option>
                <option value="historia">Historia</option>
              </select>
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción (opcional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                rows="3"
              />
            </div>

            {/* Botón */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className={`btn w-100 fw-bold ${
                selectedFile && !loading ? 'btn-danger' : 'btn-secondary disabled'
              }`}
            >
              {loading ? 'Subiendo...' : 'Subir Recurso'}
            </button>

            {/* Estado */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3 text-center text-danger fw-bold">
                Subiendo... {uploadProgress}%
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-3 alert alert-success text-center">
                ¡Recurso subido con éxito!
              </div>
            )}
            {uploadError && (
              <div className="mt-3 alert alert-danger text-center">
                {uploadError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;


