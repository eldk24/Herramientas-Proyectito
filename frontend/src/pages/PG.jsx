import React from "react";
import { Link } from "react-router-dom";

function PG() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-start align-items-center">
      {/* Carrusel de imágenes */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide w-100"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://ecoperu.tv/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-27-at-10.18.30.jpeg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="Educación"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://rumboeconomico.com/wp-content/uploads/2023/04/UTP-Capacitacion.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="Recursos Digitales"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://larazon.pe/wp-content/uploads/2022/08/UTP-1.jpg"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="Docentes"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Contenido principal */}
      <div className="container text-center mt-5 px-3 px-md-5">
        <h1 className="display-5 fw-bold text-danger mb-3">
          UTP - Universidad Tecnológica del Perú
        </h1>
        <p className="lead text-secondary mb-5">
          Bienvenid@ al sistema de gestión de recursos educativos digitales
          para docentes de la UTP. Accede o regístrate para comenzar a gestionar
          tus materiales de enseñanza de forma sencilla y eficiente.
        </p>

        {/* Botones para login y registro */}
        <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
          <Link to="/login" className="btn btn-primary btn-lg shadow">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-success btn-lg shadow">
            Registrarse
          </Link>
        </div>

        {/* Sección de beneficios */}
        <h2 className="mb-4 text-primary">¿Por qué usar nuestro sistema?</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-cloud-upload-fill fs-1 text-success"></i>
                </div>
                <h5 className="card-title">Carga y organiza</h5>
                <p className="card-text">
                  Sube y organiza fácilmente recursos digitales para tus clases,
                  desde documentos hasta videos y presentaciones.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-search fs-1 text-info"></i>
                </div>
                <h5 className="card-title">Búsqueda rápida</h5>
                <p className="card-text">
                  Encuentra cualquier recurso con nuestro potente motor de búsqueda
                  y filtros avanzados.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-people-fill fs-1 text-warning"></i>
                </div>
                <h5 className="card-title">Colaboración</h5>
                <p className="card-text">
                  Comparte materiales y colabora con otros docentes para enriquecer
                  el aprendizaje.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios o citas */}
        <blockquote className="blockquote text-center mb-5 px-3">
          <p className="mb-3 fst-italic">
            "Este sistema ha revolucionado la forma en que preparo mis clases.
            Ahora todo está organizado y al alcance de un clic."
          </p>
          <footer className="blockquote-footer text-secondary">
            Mag. Brenda Lescano, <cite title="Source Title">Docente UTP</cite>
          </footer>
        </blockquote>
      </div>

      {/* Footer simple */}
      <footer className="w-100 bg-danger text-white text-center py-3 mt-auto">
        <small>
          © {new Date().getFullYear()} Universidad Tecnológica del Perú — Todos los
          derechos reservados.
        </small>
      </footer>
    </div>
  );
}

export default PG;



