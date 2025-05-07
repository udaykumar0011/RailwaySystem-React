
// This is a simplified dataset of Indian Railway stations and routes

// Popular stations with codes
export const indianRailwayStations = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'CSTM', name: 'Mumbai CST' },
  { code: 'HWH', name: 'Howrah' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'SBC', name: 'Bangalore City' },
  { code: 'SC', name: 'Secunderabad' },
  { code: 'MGS', name: 'Mughal Sarai' },
  { code: 'CNB', name: 'Kanpur Central' },
  { code: 'ALD', name: 'Allahabad' },
  { code: 'BPL', name: 'Bhopal' },
  { code: 'PUNE', name: 'Pune' },
  { code: 'GKP', name: 'Gorakhpur' },
  { code: 'INDB', name: 'Indore' },
  { code: 'BSB', name: 'Varanasi' },
  { code: 'NGP', name: 'Nagpur' },
  { code: 'LKO', name: 'Lucknow' },
  { code: 'JU', name: 'Jodhpur' },
  { code: 'JAT', name: 'Jammu' },
  { code: 'JP', name: 'Jaipur' },
  { code: 'ADI', name: 'Ahmedabad' },
  { code: 'PNP', name: 'Panipat' },
  { code: 'ASR', name: 'Amritsar' },
  { code: 'UDZ', name: 'Udaipur' },
  { code: 'KOTA', name: 'Kota' },
  { code: 'DLI', name: 'Delhi' },
  { code: 'DDN', name: 'Dehradun' },
  { code: 'BTI', name: 'Bhatinda' },
  { code: 'CDG', name: 'Chandigarh' },
  { code: 'SVDK', name: 'Shri Mata Vaishno Devi Katra' },
  { code: 'KYQ', name: 'Kanyakumari' },
  { code: 'RMM', name: 'Rameswaram' },
  { code: 'PURI', name: 'Puri' },
  { code: 'MYS', name: 'Mysore' },
  { code: 'MAO', name: 'Madgaon (Goa)' },
  { code: 'VSKP', name: 'Visakhapatnam' },
  { code: 'BZA', name: 'Vijayawada' },
  { code: 'MFP', name: 'Muzaffarpur' },
  { code: 'DBG', name: 'Darbhanga' },
  { code: 'PNE', name: 'Pune' },
];

// Popular train routes in India
export const popularRoutes = [
  { from: 'NDLS', to: 'HWH' },
  { from: 'NDLS', to: 'MAS' },
  { from: 'CSTM', to: 'NDLS' },
  { from: 'HWH', to: 'NDLS' },
  { from: 'SBC', to: 'MAS' },
  { from: 'NDLS', to: 'SBC' },
  { from: 'NDLS', to: 'ASR' },
  { from: 'NDLS', to: 'JAT' },
  { from: 'CSTM', to: 'SBC' },
  { from: 'LKO', to: 'NDLS' },
  { from: 'ADI', to: 'NDLS' },
  { from: 'JP', to: 'NDLS' },
];

// Sample train data
const trainDatabase = [
  {
    number: '12301',
    name: 'Rajdhani Express',
    source: 'NDLS',
    destination: 'HWH',
    departureTime: '16:55',
    arrivalTime: '10:10',
    duration: '17h 15m',
    runDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availability: {
      '1A': 'AVAILABLE',
      '2A': 'AVAILABLE',
      '3A': 'RAC',
      'SL': 'AVAILABLE',
    }
  },
  {
    number: '12951',
    name: 'Mumbai Rajdhani',
    source: 'NDLS',
    destination: 'BCT',
    departureTime: '16:25',
    arrivalTime: '08:15',
    duration: '15h 50m',
    runDays: ['Daily'],
    availability: {
      '1A': 'AVAILABLE',
      '2A': 'WL 5',
      '3A': 'AVAILABLE',
      'SL': 'AVAILABLE',
    }
  },
  {
    number: '12259',
    name: 'Sealdah Duronto',
    source: 'NDLS',
    destination: 'HWH',
    departureTime: '20:05',
    arrivalTime: '13:35',
    duration: '17h 30m',
    runDays: ['Mon', 'Tue', 'Fri'],
    availability: {
      '2A': 'AVAILABLE',
      '3A': 'WL 12',
      'SL': 'AVAILABLE',
    }
  },
  {
    number: '12002',
    name: 'Bhopal Shatabdi',
    source: 'NDLS',
    destination: 'BPL',
    departureTime: '06:15',
    arrivalTime: '13:40',
    duration: '7h 25m',
    runDays: ['Daily'],
    availability: {
      'CC': 'AVAILABLE',
      'EC': 'AVAILABLE',
    }
  },
  {
    number: '12303',
    name: 'Poorva Express',
    source: 'HWH',
    destination: 'NDLS',
    departureTime: '20:50',
    arrivalTime: '20:05',
    duration: '23h 15m',
    runDays: ['Daily'],
    availability: {
      '2A': 'WL 8',
      '3A': 'AVAILABLE',
      'SL': 'AVAILABLE',
      '2S': 'AVAILABLE',
    }
  },
  {
    number: '12305',
    name: 'Howrah-Delhi Rajdhani',
    source: 'HWH',
    destination: 'NDLS',
    departureTime: '14:05',
    arrivalTime: '10:00',
    duration: '19h 55m',
    runDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    availability: {
      '1A': 'AVAILABLE',
      '2A': 'AVAILABLE',
      '3A': 'AVAILABLE',
    }
  },
  {
    number: '12909',
    name: 'Mumbai-Nizamuddin Garib Rath',
    source: 'CSTM',
    destination: 'NDLS',
    departureTime: '17:45',
    arrivalTime: '16:15',
    duration: '22h 30m',
    runDays: ['Wed', 'Fri', 'Sun'],
    availability: {
      '3A': 'AVAILABLE',
    }
  },
  {
    number: '12622',
    name: 'Tamil Nadu Express',
    source: 'MAS',
    destination: 'NDLS',
    departureTime: '22:35',
    arrivalTime: '07:55',
    duration: '33h 20m',
    runDays: ['Daily'],
    availability: {
      '2A': 'AVAILABLE',
      '3A': 'AVAILABLE',
      'SL': 'WL 25',
      '2S': 'AVAILABLE',
    }
  },
  {
    number: '12611',
    name: 'Bangalore Rajdhani',
    source: 'SBC',
    destination: 'NDLS',
    departureTime: '20:00',
    arrivalTime: '05:55',
    duration: '33h 55m',
    runDays: ['Tue', 'Thu', 'Fri', 'Sun'],
    availability: {
      '1A': 'AVAILABLE',
      '2A': 'AVAILABLE',
      '3A': 'AVAILABLE',
    }
  },
  {
    number: '12626',
    name: 'Kerala Express',
    source: 'TVC',
    destination: 'NDLS',
    departureTime: '11:15',
    arrivalTime: '17:40',
    duration: '54h 25m',
    runDays: ['Daily'],
    availability: {
      '2A': 'WL 15',
      '3A': 'WL 24',
      'SL': 'WL 48',
      '2S': 'AVAILABLE',
    }
  },
];

// Function to find trains between two stations
export const findTrainsBetweenStations = (source: string, destination: string): any[] => {
  // Simple implementation - in a real app, this would query an API
  return trainDatabase.filter(train => 
    (train.source === source && train.destination === destination) ||
    (train.destination === source && train.source === destination)
  );
};
