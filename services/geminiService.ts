import { GoogleGenAI, Type } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export interface AnalysisResult {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedAction: string;
}

export const analyzeMaintenanceReport = async (description: string): Promise<AnalysisResult> => {
  const client = getClient();
  
  // Fallback if no API key (for demo purposes without crashing)
  if (!client) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          category: "General",
          severity: "medium",
          suggestedAction: "Revisión manual requerida (Simulado: Sin API Key)"
        });
      }, 1000);
    });
  }

  try {
    const modelId = "gemini-2.5-flash";
    const prompt = `
      Analiza el siguiente reporte de mantenimiento de una universidad y extrae la información en JSON.
      Reporte: "${description}"
      
      Clasifica en una de estas categorías: Electricidad, Plomería, Mobiliario, Limpieza, Seguridad, TI/Equipo, Otro.
      Determina la severidad: low, medium, high, critical.
      Sugiere una acción inmediata corta.
    `;

    const response = await client.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["low", "medium", "high", "critical"] },
            suggestedAction: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing report:", error);
    return {
      category: "Desconocido",
      severity: "medium",
      suggestedAction: "Revisión manual por error en análisis"
    };
  }
};