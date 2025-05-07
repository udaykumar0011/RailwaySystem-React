
import React from 'react';

interface Station {
  id: string;
  name: string;
  x: number; // percentage position
  active?: boolean;
}

interface Route {
  stations: Station[];
}

interface RouteMapProps {
  route: Route;
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  return (
    <div className="railway-card">
      <h2 className="text-lg font-medium mb-4">Popular Route Map</h2>
      <div className="relative h-20 px-4">
        {/* Track line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-railway-light border border-railway-accent rounded-full"></div>
        
        {/* Stations */}
        {route.stations.map((station) => (
          <div 
            key={station.id} 
            className="absolute transform -translate-y-1/2"
            style={{ left: `${station.x}%`, top: '50%' }}
          >
            {/* Station dot */}
            <div className={`w-4 h-4 rounded-full border-2 ${
              station.active 
                ? 'bg-railway-secondary border-railway-secondary' 
                : 'bg-white border-railway-accent'
            }`}>
            </div>
            
            {/* Station name */}
            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <p className="text-xs font-medium">{station.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
