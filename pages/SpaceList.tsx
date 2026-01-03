import React, { useState, useMemo } from 'react';
import { SPACES } from '../services/mockData';
import SpaceCard from '../components/SpaceCard';
import { Building, Floor, SpaceType } from '../types';
import { Filter, X } from 'lucide-react';

const SpaceList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterBuilding, setFilterBuilding] = useState<string>('ALL');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSpaces = useMemo(() => {
    return SPACES.filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(search.toLowerCase()) || 
                            space.id.toLowerCase().includes(search.toLowerCase());
      const matchesBuilding = filterBuilding === 'ALL' || space.building === filterBuilding;
      const matchesLevel = filterLevel === 'ALL' || space.floor === filterLevel;
      const matchesType = filterType === 'ALL' || space.type === filterType;
      
      return matchesSearch && matchesBuilding && matchesLevel && matchesType;
    });
  }, [search, filterBuilding, filterLevel, filterType]);

  const clearFilters = () => {
    setFilterBuilding('ALL');
    setFilterLevel('ALL');
    setFilterType('ALL');
    setSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Directorio de Espacios</h1>
        
        <div className="flex gap-2">
           <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
           </div>
           <button 
             onClick={() => setShowFilters(!showFilters)}
             className={`p-2 rounded-lg border ${showFilters ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-600'}`}
           >
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Edificio</label>
              <select 
                value={filterBuilding} 
                onChange={(e) => setFilterBuilding(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="ALL">Todos</option>
                {Object.values(Building).map(b => <option key={b} value={b}>Edificio {b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Nivel</label>
              <select 
                value={filterLevel} 
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="ALL">Todos</option>
                {Object.values(Floor).map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="ALL">Todos</option>
                {Object.values(SpaceType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" /> Limpiar
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredSpaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpaces.map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No se encontraron espacios con estos filtros.</p>
          <button onClick={clearFilters} className="mt-4 text-blue-600 font-medium hover:underline">
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default SpaceList;