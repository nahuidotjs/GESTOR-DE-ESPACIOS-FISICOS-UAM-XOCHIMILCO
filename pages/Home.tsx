import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Calendar } from 'lucide-react';
import { SPACES } from '../services/mockData';
import SpaceCard from '../components/SpaceCard';
import { SpaceStatus } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Get some featured/available spaces
  const featuredSpaces = SPACES.filter(s => s.status === SpaceStatus.AVAILABLE).slice(0, 3);

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.uam.mx/images/encabezado/logos/logo_uam.png')] bg-center bg-no-repeat"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Gestión de Espacios UAM Xochimilco
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Encuentra aulas, laboratorios y espacios disponibles en los edificios O, P y Q. 
            Reserva o reporta problemas de mantenimiento al instante.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/spaces')}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-md flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar Espacio
            </button>
            <button 
              onClick={() => navigate('/reports')}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md flex items-center justify-center border border-blue-500"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Reportar Problema
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-100">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Espacios Totales</p>
              <p className="text-2xl font-bold text-gray-900">{SPACES.length}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
             <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Disponibles Hoy</p>
              <p className="text-2xl font-bold text-gray-900">
                {SPACES.filter(s => s.status === SpaceStatus.AVAILABLE).length}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
             <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 mr-4">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">En Mantenimiento</p>
              <p className="text-2xl font-bold text-gray-900">
                {SPACES.filter(s => s.status === SpaceStatus.MAINTENANCE).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spaces Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Espacios Destacados</h2>
          <button onClick={() => navigate('/spaces')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver todos &rarr;</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpaces.map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;