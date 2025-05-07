
import React, { useState } from 'react';
import { Train, MapPin, Calendar, Users, Ticket } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StatsCard from '@/components/Dashboard/StatsCard';
import TrainSchedule from '@/components/Dashboard/TrainSchedule';
import RouteMap from '@/components/Dashboard/RouteMap';
import PlatformStatus from '@/components/Dashboard/PlatformStatus';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Demo data
  const scheduleData = [
    { 
      id: '1', 
      trainNumber: 'EX-1024', 
      route: 'Central - Westpark', 
      departureTime: '09:15 AM', 
      arrivalTime: '10:45 AM', 
      platform: 'P-03', 
      status: 'Boarding' as const
    },
    { 
      id: '2', 
      trainNumber: 'SP-345', 
      route: 'Central - Northland', 
      departureTime: '09:30 AM', 
      arrivalTime: '11:15 AM', 
      platform: 'P-05', 
      status: 'On Time' as const
    },
    { 
      id: '3', 
      trainNumber: 'EX-721', 
      route: 'Central - Eastville', 
      departureTime: '09:45 AM', 
      arrivalTime: '10:30 AM', 
      platform: 'P-01', 
      status: 'Delayed' as const 
    },
    { 
      id: '4', 
      trainNumber: 'LC-512', 
      route: 'Central - Southport', 
      departureTime: '10:00 AM', 
      arrivalTime: '11:30 AM', 
      platform: 'P-04', 
      status: 'On Time' as const
    },
  ];

  const routeData = {
    stations: [
      { id: 's1', name: 'Central', x: 5, active: true },
      { id: 's2', name: 'Midtown', x: 25 },
      { id: 's3', name: 'Parkside', x: 45 },
      { id: 's4', name: 'Westpark', x: 65, active: true },
      { id: 's5', name: 'Riverside', x: 85 },
    ]
  };

  const platformData = [
    { id: 'p1', number: '01', trainNumber: 'EX-721', occupiedUntil: '10:30 AM', utilization: 85 },
    { id: 'p2', number: '02', nextArrival: '09:55 AM', utilization: 0 },
    { id: 'p3', number: '03', trainNumber: 'EX-1024', occupiedUntil: '09:25 AM', utilization: 65 },
    { id: 'p4', number: '04', trainNumber: 'LC-512', occupiedUntil: '10:10 AM', utilization: 40 },
    { id: 'p5', number: '05', trainNumber: 'SP-345', occupiedUntil: '09:40 AM', utilization: 50 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main className="md:ml-64 p-4 md:p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-railway-primary">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to ReRailway Management System</p>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Trains" 
            value="42" 
            change="8%" 
            isPositive={true}
            icon={<Train size={24} className="text-railway-primary" />}
            bgColor="bg-railway-primary/10"
          />
          <StatsCard 
            title="Active Routes" 
            value="16" 
            change="12%" 
            isPositive={true}
            icon={<MapPin size={24} className="text-railway-accent" />}
            bgColor="bg-railway-accent/10"
          />
          <StatsCard 
            title="Today's Trips" 
            value="128" 
            change="5%" 
            isPositive={false}
            icon={<Calendar size={24} className="text-amber-500" />}
            bgColor="bg-amber-500/10"
          />
          <StatsCard 
            title="Passengers" 
            value="2,845" 
            change="15%" 
            isPositive={true}
            icon={<Users size={24} className="text-green-600" />}
            bgColor="bg-green-600/10"
          />
        </div>
        
        {/* Schedule and Platform section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrainSchedule schedules={scheduleData} />
          </div>
          <div>
            <PlatformStatus platforms={platformData} />
          </div>
        </div>
        
        {/* Route Map */}
        <div className="mb-6">
          <RouteMap route={routeData} />
        </div>
        
        {/* Quick Actions */}
        <div className="railway-card">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <button className="p-4 flex flex-col items-center gap-2 bg-railway-light rounded-lg hover:bg-railway-light/80 transition-colors">
              <Train size={24} className="text-railway-primary" />
              <span className="text-sm">Add Train</span>
            </button>
            <button className="p-4 flex flex-col items-center gap-2 bg-railway-light rounded-lg hover:bg-railway-light/80 transition-colors">
              <Calendar size={24} className="text-railway-primary" />
              <span className="text-sm">Schedule</span>
            </button>
            <button className="p-4 flex flex-col items-center gap-2 bg-railway-light rounded-lg hover:bg-railway-light/80 transition-colors">
              <Ticket size={24} className="text-railway-primary" />
              <span className="text-sm">Tickets</span>
            </button>
            <button className="p-4 flex flex-col items-center gap-2 bg-railway-light rounded-lg hover:bg-railway-light/80 transition-colors">
              <MapPin size={24} className="text-railway-primary" />
              <span className="text-sm">Routes</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
