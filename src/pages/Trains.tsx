
import React, { useState } from 'react';
import { Search, Settings, Train, Filter, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Trains = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Demo train data
  const trains = [
    { 
      id: 'TR-1001', 
      name: 'Express 1024', 
      type: 'Express', 
      capacity: 380, 
      status: 'Active', 
      maintenanceDate: '2025-06-15', 
      lastInspection: '2025-05-01'
    },
    { 
      id: 'TR-1002', 
      name: 'Local 512', 
      type: 'Local', 
      capacity: 240, 
      status: 'Active', 
      maintenanceDate: '2025-06-20', 
      lastInspection: '2025-04-28'
    },
    { 
      id: 'TR-1003', 
      name: 'SuperFast 345', 
      type: 'SuperFast', 
      capacity: 320, 
      status: 'Maintenance', 
      maintenanceDate: '2025-05-12', 
      lastInspection: '2025-04-15'
    },
    { 
      id: 'TR-1004', 
      name: 'Local 628', 
      type: 'Local', 
      capacity: 240, 
      status: 'Active', 
      maintenanceDate: '2025-07-05', 
      lastInspection: '2025-05-02'
    },
    { 
      id: 'TR-1005', 
      name: 'Express 721', 
      type: 'Express', 
      capacity: 380, 
      status: 'Inactive', 
      maintenanceDate: '2025-05-25', 
      lastInspection: '2025-03-29'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Maintenance':
        return <Badge className="bg-amber-500">Maintenance</Badge>;
      case 'Inactive':
        return <Badge className="bg-slate-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main className="md:ml-64 p-4 md:p-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-railway-primary">Train Management</h1>
            <p className="text-muted-foreground">Manage your train fleet</p>
          </div>
          <Button className="railway-button-primary">
            <Plus className="mr-2 h-4 w-4" /> Add New Train
          </Button>
        </div>
        
        {/* Filters and search */}
        <div className="railway-card mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search trains..." 
                className="pl-9" 
              />
            </div>
            <div className="flex gap-2 self-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Columns
              </Button>
            </div>
          </div>
        </div>
        
        {/* Trains table */}
        <div className="railway-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Train Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell className="font-medium">{train.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Train size={16} className="text-railway-primary" />
                        {train.name}
                      </div>
                    </TableCell>
                    <TableCell>{train.type}</TableCell>
                    <TableCell>{train.capacity} passengers</TableCell>
                    <TableCell>{getStatusBadge(train.status)}</TableCell>
                    <TableCell>{train.maintenanceDate}</TableCell>
                    <TableCell>{train.lastInspection}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trains;
