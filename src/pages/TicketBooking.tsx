
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingForm from '@/components/Booking/BookingForm';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const TicketBooking: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Ticket Booking" toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Book Your Train Ticket</h1>
            
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="new">New Booking</TabsTrigger>
                <TabsTrigger value="tatkal">Tatkal Booking</TabsTrigger>
              </TabsList>
              <TabsContent value="new" className="mt-4">
                <BookingForm isTatkal={false} />
              </TabsContent>
              <TabsContent value="tatkal" className="mt-4">
                <BookingForm isTatkal={true} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketBooking;
