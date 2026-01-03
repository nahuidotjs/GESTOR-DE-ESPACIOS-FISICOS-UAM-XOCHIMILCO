import { Space, Building, Floor, SpaceType, SpaceStatus } from '../types';

export const SPACES: Space[] = [
  // PLANTA BAJA (Edificio O, P, Q)
  {
    id: 'PB-AUD',
    name: 'Auditorio Central',
    building: Building.O,
    floor: Floor.PB,
    type: SpaceType.AUDITORIUM,
    capacity: 150,
    status: SpaceStatus.AVAILABLE,
    features: ['Proyector', 'Audio', 'Aire Acondicionado'],
    image: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 'PB-LAB-MAT',
    name: 'Lab. Pruebas Materiales',
    building: Building.P,
    floor: Floor.PB,
    type: SpaceType.LAB,
    capacity: 30,
    status: SpaceStatus.OCCUPIED,
    features: ['Equipamiento Especializado'],
    image: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: 'PB-COMP-1',
    name: 'Aula de Cómputo 1',
    building: Building.Q,
    floor: Floor.PB,
    type: SpaceType.CLASSROOM,
    capacity: 40,
    status: SpaceStatus.AVAILABLE,
    features: ['30 PCs', 'Internet'],
    image: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: 'PB-CAF',
    name: 'Cafetería Edificio O',
    building: Building.O,
    floor: Floor.PB,
    type: SpaceType.COMMON,
    capacity: 50,
    status: SpaceStatus.AVAILABLE,
    image: 'https://picsum.photos/400/200?random=11'
  },
  {
    id: 'PB-O-101',
    name: 'Aula PB-101',
    building: Building.O,
    floor: Floor.PB,
    type: SpaceType.CLASSROOM,
    capacity: 30,
    status: SpaceStatus.OCCUPIED,
    image: 'https://picsum.photos/400/200?random=12'
  },
  
  // PRIMER NIVEL
  {
    id: 'N1-AULA-1',
    name: 'Aula Teórica 101',
    building: Building.O,
    floor: Floor.N1,
    type: SpaceType.CLASSROOM,
    capacity: 35,
    status: SpaceStatus.AVAILABLE,
    features: ['Pizarrón', 'Ventilación'],
    image: 'https://picsum.photos/400/200?random=4'
  },
  {
    id: 'N1-AULA-2',
    name: 'Aula Teórica 102',
    building: Building.O,
    floor: Floor.N1,
    type: SpaceType.CLASSROOM,
    capacity: 35,
    status: SpaceStatus.MAINTENANCE,
    image: 'https://picsum.photos/400/200?random=13'
  },
  {
    id: 'N1-COORD',
    name: 'Coordinación de Espacios',
    building: Building.Q,
    floor: Floor.N1,
    type: SpaceType.OFFICE,
    capacity: 5,
    status: SpaceStatus.RESTRICTED,
    features: ['Oficina Administrativa'],
    image: 'https://picsum.photos/400/200?random=5'
  },
  {
    id: 'N1-WC-M',
    name: 'Sanitarios Mujeres N1',
    building: Building.P,
    floor: Floor.N1,
    type: SpaceType.BATHROOM,
    capacity: 10,
    status: SpaceStatus.AVAILABLE,
    image: 'https://picsum.photos/400/200?random=6'
  },
  {
    id: 'N1-LAB-Q',
    name: 'Laboratorio Químico',
    building: Building.Q,
    floor: Floor.N1,
    type: SpaceType.LAB,
    capacity: 25,
    status: SpaceStatus.OCCUPIED,
    image: 'https://picsum.photos/400/200?random=14'
  },

  // SEGUNDO NIVEL
  {
    id: 'N2-TALLER-DIS',
    name: 'Taller de Diseño',
    building: Building.O,
    floor: Floor.N2,
    type: SpaceType.WORKSHOP,
    capacity: 25,
    status: SpaceStatus.MAINTENANCE,
    features: ['Mesas de Trabajo', 'Luz Natural'],
    image: 'https://picsum.photos/400/200?random=7'
  },
  {
    id: 'N2-GEO',
    name: 'Información Geográfica',
    building: Building.Q,
    floor: Floor.N2,
    type: SpaceType.LAB,
    capacity: 20,
    status: SpaceStatus.AVAILABLE,
    image: 'https://picsum.photos/400/200?random=8'
  },
  {
    id: 'N2-O-201',
    name: 'Aula N2-201',
    building: Building.O,
    floor: Floor.N2,
    type: SpaceType.CLASSROOM,
    capacity: 40,
    status: SpaceStatus.AVAILABLE,
    image: 'https://picsum.photos/400/200?random=15'
  },
  {
    id: 'N2-O-202',
    name: 'Aula N2-202',
    building: Building.O,
    floor: Floor.N2,
    type: SpaceType.CLASSROOM,
    capacity: 40,
    status: SpaceStatus.OCCUPIED,
    image: 'https://picsum.photos/400/200?random=16'
  },

  // TERCER NIVEL
  {
    id: 'N3-AULA-MAGNA',
    name: 'Aula Magna 301',
    building: Building.O,
    floor: Floor.N3,
    type: SpaceType.CLASSROOM,
    capacity: 60,
    status: SpaceStatus.AVAILABLE,
    image: 'https://picsum.photos/400/200?random=9'
  },
  {
    id: 'N3-OF-DIR',
    name: 'Dirección de la División',
    building: Building.P,
    floor: Floor.N3,
    type: SpaceType.OFFICE,
    capacity: 4,
    status: SpaceStatus.RESTRICTED,
    image: 'https://picsum.photos/400/200?random=10'
  }
];