import React, { useState, useMemo } from 'react';
import { SPACES } from '../services/mockData';
import { Building, Floor, SpaceStatus, Space } from '../types';
import { useNavigate } from 'react-router-dom';
import { Info, Layers, MapPin } from 'lucide-react';

const MapExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [activeBuilding, setActiveBuilding] = useState<Building>(Building.O);
  const [activeFloor, setActiveFloor] = useState<Floor>(Floor.PB);
  const [hoveredSpace, setHoveredSpace] = useState<Space | null>(null);

  // Filter spaces based on selection
  const currentLevelSpaces = useMemo(() => {
    return SPACES.filter(
      s => s.building === activeBuilding && s.floor === activeFloor
    );
  }, [activeBuilding, activeFloor]);

  const getStatusColorSVG = (status: SpaceStatus) => {
    switch (status) {
      case SpaceStatus.AVAILABLE: return '#dcfce7'; // green-100
      case SpaceStatus.OCCUPIED: return '#fee2e2'; // red-100
      case SpaceStatus.MAINTENANCE: return '#fef9c3'; // yellow-100
      case SpaceStatus.RESTRICTED: return '#f3f4f6'; // gray-100
      default: return '#f3f4f6';
    }
  };

  const getStatusStroke = (status: SpaceStatus) => {
    switch (status) {
      case SpaceStatus.AVAILABLE: return '#22c55e';
      case SpaceStatus.OCCUPIED: return '#ef4444';
      case SpaceStatus.MAINTENANCE: return '#eab308';
      case SpaceStatus.RESTRICTED: return '#6b7280';
      default: return '#9ca3af';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header Control Panel */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-600" />
            Explorador Visual
          </h1>
          <p className="text-sm text-gray-500">Navega por edificio y nivel para ver el estado en tiempo real.</p>
        </div>
        
        <div className="flex items-center gap-4">
            {/* Building Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {Object.values(Building).map((b) => (
                    <button
                        key={b}
                        onClick={() => setActiveBuilding(b)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                            activeBuilding === b 
                            ? 'bg-white text-blue-700 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        Edificio {b}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar Level Selector (Visual Stack) */}
        <div className="w-24 md:w-32 bg-white border-r border-gray-200 flex flex-col items-center py-8 gap-2 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-4 tracking-widest">Niveles</div>
            <div className="flex flex-col-reverse w-full px-2 gap-3">
                {Object.values(Floor).map((floor, index) => {
                     // Simple abbreviation for visual cleaner look
                     const label = floor === Floor.PB ? 'PB' : `N${index}`;
                     const isActive = activeFloor === floor;

                     return (
                        <button
                            key={floor}
                            onClick={() => setActiveFloor(floor)}
                            className={`
                                relative w-full aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 group
                                ${isActive 
                                    ? 'bg-blue-50 border-blue-500 translate-x-2' 
                                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }
                            `}
                        >
                             {/* 3D Edge Effect */}
                             <div className={`absolute right-0 top-0 bottom-0 w-1 ${isActive ? 'bg-blue-600' : 'bg-gray-300'} rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                             
                             <Layers className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                             <span className={`text-sm font-bold ${isActive ? 'text-blue-800' : 'text-gray-600'}`}>
                                {label}
                             </span>
                             <span className="text-[10px] text-gray-400 hidden md:block text-center leading-tight px-1 mt-1">
                                 {floor}
                             </span>
                        </button>
                     );
                })}
            </div>
        </div>

        {/* Main Visualization Area */}
        <div className="flex-grow relative bg-slate-100 overflow-auto flex items-center justify-center p-8">
            
            {/* Interactive SVG Map */}
            <div className="relative bg-white rounded-xl shadow-xl border-4 border-white max-w-5xl w-full aspect-[16/9] overflow-hidden">
                
                {/* Dynamic SVG */}
                <svg className="w-full h-full bg-slate-50" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                    {/* Grid Pattern Background */}
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Building Structure (Walls) */}
                    <rect x="50" y="50" width="900" height="500" rx="20" fill="white" stroke="#94a3b8" strokeWidth="4" className="drop-shadow-sm" />
                    
                    {/* Central Corridor */}
                    <rect x="80" y="250" width="840" height="100" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="500" y="305" textAnchor="middle" className="text-2xl font-bold fill-gray-300 select-none pointer-events-none tracking-[1em] opacity-50">PASILLO PRINCIPAL</text>

                    {/* Rooms Generation Logic */}
                    {currentLevelSpaces.length > 0 ? (
                        currentLevelSpaces.map((space, index) => {
                            // Simple auto-layout algorithm
                            // Split spaces into Top Row and Bottom Row
                            const isTop = index % 2 === 0;
                            const itemsInRow = Math.ceil(currentLevelSpaces.length / 2);
                            const positionInRow = Math.floor(index / 2);
                            
                            // Calculate widths dynamic to fit
                            const padding = 20;
                            const availableWidth = 840 - (itemsInRow * padding); // 840 is corridor width
                            const roomWidth = Math.min(200, availableWidth / Math.max(2, itemsInRow));
                            
                            // Center the cluster of rooms
                            const totalRowWidth = (roomWidth * itemsInRow) + (padding * (itemsInRow - 1));
                            const startX = 500 - (totalRowWidth / 2);

                            const x = startX + (positionInRow * (roomWidth + padding));
                            const y = isTop ? 70 : 370; // Top row y=70, Bottom row y=370 (Corridor ends at 350)
                            const height = 160;

                            return (
                                <g 
                                    key={space.id} 
                                    onClick={() => navigate(`/spaces/${space.id}`)}
                                    onMouseEnter={() => setHoveredSpace(space)}
                                    onMouseLeave={() => setHoveredSpace(null)}
                                    className="cursor-pointer transition-opacity hover:opacity-90"
                                >
                                    <rect
                                        x={x}
                                        y={y}
                                        width={roomWidth}
                                        height={height}
                                        fill={getStatusColorSVG(space.status)}
                                        stroke={getStatusStroke(space.status)}
                                        strokeWidth="2"
                                        rx="4"
                                    />
                                    {/* Door */}
                                    <rect 
                                        x={x + roomWidth/2 - 15} 
                                        y={isTop ? y + height - 5 : y - 5} 
                                        width="30" 
                                        height="10" 
                                        fill="white" 
                                        stroke="#94a3b8"
                                    />
                                    
                                    {/* Label */}
                                    <foreignObject x={x} y={y + height/2 - 30} width={roomWidth} height="60">
                                        <div className="flex flex-col items-center justify-center h-full p-1 text-center pointer-events-none">
                                            <span className="text-xs font-bold text-gray-700 truncate w-full px-1">{space.id}</span>
                                            <span className="text-[10px] text-gray-500 truncate w-full px-1 leading-tight">{space.type}</span>
                                            {space.status === SpaceStatus.MAINTENANCE && (
                                                <span className="mt-1 text-[10px] bg-yellow-200 text-yellow-800 px-1 rounded">⚠</span>
                                            )}
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })
                    ) : (
                         <text x="500" y="300" textAnchor="middle" className="text-lg fill-gray-400">No hay espacios registrados en este nivel</text>
                    )}

                    {/* Building/Floor Label Overlay on Map */}
                    <rect x="60" y="60" width="200" height="40" rx="4" fill="rgba(255,255,255,0.9)" />
                    <text x="75" y="87" className="text-lg font-bold fill-gray-800">
                        Edificio {activeBuilding} - {activeFloor === Floor.PB ? 'PB' : activeFloor}
                    </text>

                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 flex gap-4 text-xs">
                    <div className="flex items-center"><span className="w-3 h-3 bg-green-100 border border-green-500 mr-1 rounded-sm"></span> Disponible</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-red-100 border border-red-500 mr-1 rounded-sm"></span> Ocupado</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-yellow-100 border border-yellow-500 mr-1 rounded-sm"></span> Mantenimiento</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-gray-100 border border-gray-500 mr-1 rounded-sm"></span> Restringido</div>
                </div>
            </div>

            {/* Hover Tooltip */}
            {hoveredSpace && (
                <div className="absolute top-4 right-4 w-64 bg-white p-4 rounded-xl shadow-2xl border border-blue-100 animate-fade-in z-50">
                    <h3 className="font-bold text-gray-900">{hoveredSpace.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-2">{hoveredSpace.type}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Capacidad:</span>
                            <span className="font-medium">{hoveredSpace.capacity} pers.</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estado:</span>
                            <span className={`font-medium ${
                                hoveredSpace.status === SpaceStatus.AVAILABLE ? 'text-green-600' :
                                hoveredSpace.status === SpaceStatus.OCCUPIED ? 'text-red-600' :
                                'text-yellow-600'
                            }`}>{hoveredSpace.status}</span>
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-400 flex items-center">
                        <Info className="w-3 h-3 mr-1" /> Click para ver detalles
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;