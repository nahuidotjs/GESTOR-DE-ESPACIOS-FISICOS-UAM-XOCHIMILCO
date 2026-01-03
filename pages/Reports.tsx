import React, { useState } from 'react';
import { SPACES } from '../services/mockData';
import { analyzeMaintenanceReport, AnalysisResult } from '../services/geminiService';
import { AlertTriangle, Sparkles, Check, Loader2 } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (analysis) setAnalysis(null); // Reset analysis if user types more
  };

  const handleAIAnalysis = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeMaintenanceReport(description);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate backend submission
    setTimeout(() => {
       // Reset form
       setSubmitted(false);
       setDescription('');
       setSelectedSpace('');
       setAnalysis(null);
       alert('Reporte enviado con éxito');
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
        case 'critical': return 'bg-red-100 text-red-800 border-red-200';
        case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            Reportar Incidencia
        </h1>
        <p className="text-gray-500 mt-2">Ayúdanos a mantener las instalaciones en buen estado. Describe el problema y nuestra IA lo clasificará.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Espacio Afectado</label>
                <select 
                    required
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                    <option value="">Selecciona un espacio...</option>
                    {SPACES.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del Problema</label>
                <div className="relative">
                    <textarea 
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        onBlur={description.length > 10 ? handleAIAnalysis : undefined}
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ej: El proyector del aula 101 parpadea mucho y huele a quemado..."
                    ></textarea>
                    <button 
                        type="button"
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing || description.length < 5}
                        className="absolute bottom-3 right-3 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md border border-purple-200 flex items-center hover:bg-purple-200 disabled:opacity-50"
                    >
                        {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        Analizar con IA
                    </button>
                </div>
            </div>

            {/* AI Analysis Result Card */}
            {analysis && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-fade-in">
                    <div className="flex items-center mb-2">
                        <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                        <h3 className="text-sm font-bold text-gray-900">Análisis Automático</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500 block">Categoría Detectada:</span>
                            <span className="font-medium text-gray-900">{analysis.category}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Severidad:</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(analysis.severity)}`}>
                                {analysis.severity.toUpperCase()}
                            </span>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="text-gray-500 block">Acción Sugerida:</span>
                            <span className="font-medium text-gray-900">{analysis.suggestedAction}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-4">
                <button 
                    type="submit"
                    disabled={submitted}
                    className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center disabled:opacity-70"
                >
                    {submitted ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin mr-2" /> Enviando...
                        </>
                    ) : (
                        'Enviar Reporte'
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Reports;