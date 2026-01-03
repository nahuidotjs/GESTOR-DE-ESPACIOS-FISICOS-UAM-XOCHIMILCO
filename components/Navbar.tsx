import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Calendar, AlertCircle, Home, Map } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-800 tracking-tight">UAM-X Espacios</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium ${isActive('/')}`}>
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Link>
              <Link to="/map" className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium ${isActive('/map')}`}>
                <Map className="w-4 h-4 mr-2" />
                Mapa
              </Link>
              <Link to="/spaces" className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium ${isActive('/spaces')}`}>
                <LayoutGrid className="w-4 h-4 mr-2" />
                Espacios
              </Link>
              <Link to="/reports" className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium ${isActive('/reports')}`}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Reportes
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Ver notificaciones</span>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                JD
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200 flex justify-around py-2 bg-white">
         <Link to="/" className="flex flex-col items-center p-2 text-xs text-gray-600">
            <Home className="w-5 h-5 mb-1" /> Inicio
         </Link>
         <Link to="/map" className="flex flex-col items-center p-2 text-xs text-gray-600">
            <Map className="w-5 h-5 mb-1" /> Mapa
         </Link>
         <Link to="/spaces" className="flex flex-col items-center p-2 text-xs text-gray-600">
            <LayoutGrid className="w-5 h-5 mb-1" /> Espacios
         </Link>
         <Link to="/reports" className="flex flex-col items-center p-2 text-xs text-gray-600">
            <AlertCircle className="w-5 h-5 mb-1" /> Reportar
         </Link>
      </div>
    </nav>
  );
};

export default Navbar;