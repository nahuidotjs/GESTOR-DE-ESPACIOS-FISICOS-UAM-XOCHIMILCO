import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SPACES } from '../services/mockData';
import { Calendar as CalendarIcon, Clock, Users, Info, ArrowLeft, CheckCircle } from 'lucide-react';

const SpaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [space, setSpace] = useState(SPACES.find(s => s.id === id));
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setSpace(SPACES.find(s => s.id === id));
  }, [id]);

  if (!space) {
    return (
      <div className="text-center pt-20">
        <h2 className="text-xl font-bold text-gray-700">Espacio no encontrado</h2>
        <button onClick={() => navigate('/spaces')} className="mt-4 text-blue-600">Volver al directorio</button>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setIsBookingModalOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Image Area */}
        <div className="h-64 md:h-80 bg-gray-200 relative">
           {space.image && <img src={space.image} alt={space.name} className="w-full h-full object-cover" />}
           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8">
             <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div className="text-white">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">{space.type}</span>
                    <h1 className="text-3xl md:text-4xl font-bold">{space.name}</h1>
                    <p className="text-gray-200 mt-1 flex items-center">
                        <Info className="w-4 h-4 mr-1" /> Edificio {space.building}, {space.floor}
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button 
                        onClick={() => setIsBookingModalOpen(true)}
                        className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-2 px-6 rounded-lg shadow-lg transition-transform active:scale-95"
                    >
                        Solicitar Uso
                    </button>
                </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-gray-200">
            {/* Left: Details */}
            <div className="col-span-2 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Información General</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start">
                        <Users className="w-6 h-6 text-gray-400 mr-3 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Capacidad</p>
                            <p className="text-lg font-semibold text-gray-900">{space.capacity} personas</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-gray-400 mr-3 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Estado</p>
                            <p className={`text-lg font-semibold ${space.status === 'Disponible' ? 'text-green-600' : 'text-yellow-600'}`}>{space.status}</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2 mb-8">
                    {space.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {feature}
                        </li>
                    )) || <p className="text-gray-500 italic">No hay características específicas listadas.</p>}
                </ul>
            </div>

            {/* Right: Schedule Mockup */}
            <div className="p-6 md:p-8 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Horario de Hoy</h3>
                    <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="space-y-3">
                    {/* Mock Schedule Items */}
                    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm opacity-50">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-gray-700">07:00 - 09:00</span>
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">Pasado</span>
                        </div>
                        <p className="text-xs text-gray-500">Clase Regular - Prof. Pérez</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm border-l-4 border-l-blue-500">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-blue-900">09:00 - 11:00</span>
                            <span className="text-xs bg-blue-200 px-2 py-0.5 rounded text-blue-800">En curso</span>
                        </div>
                        <p className="text-xs text-blue-700">Taller de Investigación</p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-gray-700">11:00 - 13:00</span>
                            <span className="text-xs bg-green-100 px-2 py-0.5 rounded text-green-800">Libre</span>
                        </div>
                        <p className="text-xs text-gray-500">Disponible para reserva</p>
                    </div>
                     <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-gray-700">13:00 - 15:00</span>
                            <span className="text-xs bg-green-100 px-2 py-0.5 rounded text-green-800">Libre</span>
                        </div>
                        <p className="text-xs text-gray-500">Disponible para reserva</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                {bookingSuccess ? (
                    <div className="text-center py-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Solicitud Enviada</h3>
                        <p className="text-sm text-gray-500 mt-2">Tu solicitud ha sido registrada y está pendiente de aprobación.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Reservar {space.name}</h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                <div className="relative">
                                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input type="date" required className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                                    <div className="relative">
                                        <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input type="time" required className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                                    <div className="relative">
                                        <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input type="time" required className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                                <textarea rows={3} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Clase de recuperación, examen, etc."></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Confirmar</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default SpaceDetail;