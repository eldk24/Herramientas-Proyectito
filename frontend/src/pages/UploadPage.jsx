import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const careerOptions = [
  'Ing. Sistemas',
  'Psicología',
  'Arquitectura',
  'Derecho'
];

const coursesByCareer = {
  'Ing. Sistemas': ['Principios de Algoritmos', 'Taller de Programación', 'Base de Datos', 'JavaScript Avanzado'],
  'Psicología': ['Personalidad', 'Motivación', 'Pruebas Psicológicas', 'Diagnóstico'],
  'Arquitectura': ['Dibujo', 'Pintura y Escultura', 'Construcción 1', 'Construcción 2'],
  'Derecho': ['Derechos Humanos', 'Derecho Público', 'Ciencia Política', 'Derecho Penal'],
};

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [career, setCareer] = useState('');
  const [course, setCourse] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('uploadedFiles');
    if (saved) {
      setUploadedFiles(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setCourse('');
  }, [career]);

  const resetForm = () => {
    setSelectedFile(null);
    setDescription('');
    setCareer('');
    setCourse('');
    setUploadProgress(0);
  };

  const saveFileMetadata = (metadata) => {
    const updatedFiles = [metadata, ...uploadedFiles];
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    setUploadedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    setUploadError('');
    setUploadSuccess(false);

    if (!selectedFile) {
      setUploadError('Por favor, selecciona un archivo.');
      return;
    }
    if (!career) {
      setUploadError('Por favor, selecciona una carrera.');
      return;
    }
    if (!course) {
      setUploadError('Por favor, selecciona un curso.');
      return;
    }

    setLoading(true);

    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      const newFile = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        description,
        career,
        course,
        uploadDate: new Date().toISOString()
      };

      saveFileMetadata(newFile);
      setUploadSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setUploadError('Hubo un error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(255, 178, 178)', minHeight: '100vh', color: '#fff' }}>
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

            {/* Carrera */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Carrera</label>
              <select
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className="form-select"
              >
                <option value="">Seleccionar carrera</option>
                {careerOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Curso (depende de carrera) */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Curso</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="form-select"
                disabled={!career}
              >
                <option value="">Seleccionar curso</option>
                {career && coursesByCareer[career].map(curso => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
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
              className={`btn w-100 fw-bold ${selectedFile && !loading ? 'btn-danger' : 'btn-secondary disabled'}`}
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

        {/* Lista de archivos subidos */}
        <div
          className="card shadow-lg mx-auto mt-5"
          style={{ maxWidth: '600px', backgroundColor: '#fff', color: '#000' }}
        >
          <div className="card-body">
            <h3 className="card-title text-center text-danger mb-3">Archivos Subidos</h3>
            {uploadedFiles.length === 0 ? (
              <p className="text-center text-muted">No hay archivos subidos aún.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Archivo</th>
                    <th>Carrera</th>
                    <th>Curso</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map(file => (
                    <tr key={file.id}>
                      <td>{file.fileName}</td>
                      <td>{file.career}</td>
                      <td>{file.course}</td>
                      <td>{file.description || '-'}</td>
                      <td>{new Date(file.uploadDate).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
