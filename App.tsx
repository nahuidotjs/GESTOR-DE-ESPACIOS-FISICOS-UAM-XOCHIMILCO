import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SpaceList from './pages/SpaceList';
import SpaceDetail from './pages/SpaceDetail';
import Reports from './pages/Reports';
import MapExplorer from './pages/MapExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/spaces" element={<SpaceList />} />
            <Route path="/spaces/:id" element={<SpaceDetail />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} UAM Xochimilco - Gestión de Espacios Físicos.
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;