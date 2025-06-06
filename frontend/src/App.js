// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import CollectionsPage from './pages/CollectionsPage';
import AdminPage from './pages/AdminPage';
import PG from "./pages/PG"; // Página principal

import DocentePage from './pages/DocentePage';
import AlumnoPage from './pages/AlumnoPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PG />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/docente" element={<DocentePage />} />
        <Route path="/alumno" element={<AlumnoPage />} />


      </Routes>
    </Router>
  );
}

export default App;

