
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Train, 
  MapPin, 
  Ticket, 
  Users, 
  Settings, 
  LogOut,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Trains', path: '/trains', icon: <Train size={20} /> },
    { name: 'Routes', path: '/routes', icon: <MapPin size={20} /> },
    { name: 'Schedules', path: '/schedules', icon: <Calendar size={20} /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket size={20} /> },
    { name: 'Passengers', path: '/passengers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "border-r border-sidebar-border"
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-railway-secondary flex items-center justify-center">
            <span className="font-bold text-white">R</span>
          </div>
          <span className="font-bold text-xl text-white">ReRailway</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col py-4">
        <nav className="mt-2 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto px-3">
          <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
