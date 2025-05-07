
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TrainList from '@/components/Booking/TrainList';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users } from 'lucide-react';
import { findTrainsBetweenStations } from '@/lib/train-data';

const TrainSelection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const dateString = searchParams.get('date') || '';
  const passengers = searchParams.get('passengers') || '1';
  const travelClass = searchParams.get('class') || 'SL';
  
  const date = dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date();
  const formattedDate = format(date, 'dd MMM yyyy');
  
  const [trains, setTrains] = useState<any[]>([]);
  
  useEffect(() => {
    if (!from || !to) {
      navigate('/ticket-booking');
      return;
    }
    
    // Simulate API call to fetch trains
    setTimeout(() => {
      const availableTrains = findTrainsBetweenStations(from, to);
      setTrains(availableTrains);
      setLoading(false);
    }, 1000);
  }, [from, to, navigate]);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Train Selection" toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4 justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">From - To</div>
                    <div className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {from} - {to}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {formattedDate}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Passengers & Class</div>
                    <div className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {passengers} {parseInt(passengers) > 1 ? 'Passengers' : 'Passenger'}
                      <Badge variant="outline" className="ml-2">{travelClass}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TrainList 
              trains={trains} 
              loading={loading} 
              date={date} 
              passengers={parseInt(passengers)}
              travelClass={travelClass}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainSelection;
