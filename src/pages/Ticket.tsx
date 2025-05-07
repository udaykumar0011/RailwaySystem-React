import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TicketHeader from '@/components/Ticket/TicketHeader';
import TicketDetails from '@/components/Ticket/TicketDetails';
import TicketSummary from '@/components/Ticket/TicketSummary';
import LoadingState from '@/components/Ticket/LoadingState';
import NotFoundState from '@/components/Ticket/NotFoundState';
import AddTicketForm from '@/components/Ticket/AddTicketForm';

interface TicketData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  from: string;
  fromStation: string;
  to: string;
  toStation: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  travelClass: string;
  coach: string;
  seats: string[];
  passengers: Array<{
    name: string;
    age: number;
    gender: string;
    seat: string;
    status: string;
  }>;
  fare: number;
  bookingDate: string;
}

const Ticket: React.FC = () => {
  const [searchParams] = useSearchParams();
  const pnr = searchParams.get('pnr');
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  useEffect(() => {
    // Simulate ticket fetching
    setTimeout(() => {
      setTicket({
        pnr: pnr || '8574631290',
        trainNumber: '12301',
        trainName: 'Rajdhani Express',
        from: 'NDLS',
        fromStation: 'New Delhi',
        to: 'HWH',
        toStation: 'Howrah',
        date: '2024-06-15',
        departureTime: '16:55',
        arrivalTime: '10:10',
        travelClass: '3A',
        coach: 'B2',
        seats: ['31', '32', '33'],
        passengers: [
          { name: 'John Doe', age: 32, gender: 'M', seat: '31', status: 'CNF' },
          { name: 'Jane Doe', age: 30, gender: 'F', seat: '32', status: 'CNF' },
          { name: 'Alex Doe', age: 10, gender: 'M', seat: '33', status: 'CNF' }
        ],
        fare: 2850,
        bookingDate: '2024-05-28'
      });
      setLoading(false);
    }, 1000);
  }, [pnr]);
  
  const handleAddTicket = () => {
    setIsAddTicketOpen(true);
  };

  const handleAddTicketSuccess = (newTicket: TicketData) => {
    setTicket(newTicket);
  };
  
  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    
    if (!ticket) {
      return <NotFoundState />;
    }
    
    return (
      <div className="max-w-3xl mx-auto ticket-container">
        <TicketHeader onAddTicket={handleAddTicket} />
        <TicketDetails ticket={ticket} />
        <TicketSummary fare={ticket.fare} />
      </div>
    );
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="E-Ticket" toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          {renderContent()}
        </main>
      </div>

      <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <AddTicketForm 
            onClose={() => setIsAddTicketOpen(false)}
            onAddSuccess={handleAddTicketSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ticket;
