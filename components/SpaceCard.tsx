import React from 'react';
import { Space, SpaceStatus } from '../types';
import { MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: SpaceStatus) => {
    switch (status) {
      case SpaceStatus.AVAILABLE: return 'bg-green-100 text-green-800 border-green-200';
      case SpaceStatus.OCCUPIED: return 'bg-red-100 text-red-800 border-red-200';
      case SpaceStatus.MAINTENANCE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case SpaceStatus.RESTRICTED: return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/spaces/${space.id}`)}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-32 bg-gray-200 overflow-hidden">
        {space.image ? (
          <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
        )}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(space.status)}`}>
          {space.status}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
            <div>
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{space.type}</span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mt-1">{space.name}</h3>
            </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>Edificio {space.building} • {space.floor}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>Capacidad: {space.capacity} pers.</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
           {space.status === SpaceStatus.MAINTENANCE ? (
               <span className="text-xs text-yellow-600 flex items-center font-medium">
                   <AlertTriangle className="w-3 h-3 mr-1" /> Reportado
               </span>
           ) : (
               <span className="text-xs text-green-600 flex items-center font-medium">
                   <CheckCircle className="w-3 h-3 mr-1" /> Operativo
               </span>
           )}
           <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
               Ver Detalle &rarr;
           </span>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;