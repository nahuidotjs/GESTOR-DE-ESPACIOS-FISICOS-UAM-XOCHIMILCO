export enum Building {
  O = 'O',
  P = 'P',
  Q = 'Q'
}

export enum Floor {
  PB = 'Planta Baja',
  N1 = '1er Nivel',
  N2 = '2do Nivel',
  N3 = '3er Nivel'
}

export enum SpaceType {
  CLASSROOM = 'Aula',
  LAB = 'Laboratorio',
  WORKSHOP = 'Taller',
  OFFICE = 'Oficina',
  AUDITORIUM = 'Auditorio',
  BATHROOM = 'Sanitario',
  MEETING_ROOM = 'Sala de Juntas',
  COMMON = 'Área Común'
}

export enum SpaceStatus {
  AVAILABLE = 'Disponible',
  OCCUPIED = 'Ocupado',
  MAINTENANCE = 'Mantenimiento',
  RESTRICTED = 'Restringido'
}

export interface Space {
  id: string;
  name: string;
  building: Building;
  floor: Floor;
  type: SpaceType;
  capacity: number;
  status: SpaceStatus;
  image?: string;
  features?: string[];
}

export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  date: string; // ISO Date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MaintenanceReport {
  id: string;
  spaceId: string;
  reportedBy: string;
  description: string;
  aiAnalysis?: {
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    suggestedAction: string;
  };
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}