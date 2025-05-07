
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Train, Calendar, Clock, IndianRupee, TicketPercent, MapPin } from 'lucide-react';

interface TrainListProps {
  trains: any[];
  loading: boolean;
  date: Date;
  passengers: number;
  travelClass: string;
}

const TrainList: React.FC<TrainListProps> = ({ trains, loading, date, passengers, travelClass }) => {
  const navigate = useNavigate();

  const classRates: Record<string, number> = {
    '1A': 2500,
    '2A': 1500,
    '3A': 1000,
    'SL': 500,
    '2S': 250,
    'CC': 750
  };

  const handleBooking = (train: any) => {
    const basePrice = classRates[travelClass] || 500;
    const totalPrice = basePrice * passengers;
    
    navigate(`/payment?trainNumber=${train.number}&name=${encodeURIComponent(train.name)}&from=${train.source}&to=${train.destination}&class=${travelClass}&passengers=${passengers}&date=${format(date, 'yyyy-MM-dd')}&departure=${train.departureTime}&arrival=${train.arrivalTime}&price=${totalPrice}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/5" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
              </div>
              <div className="bg-muted p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-8 w-1/6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <Card className="text-center p-8">
        <div className="mb-4 flex justify-center">
          <Train className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Trains Found</h3>
        <p className="text-muted-foreground">
          There are no trains available for the selected route. 
          Please try different stations or another date.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Available Trains ({trains.length})</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          {format(date, 'EEEE, dd MMM yyyy')}
        </div>
      </div>
      
      {trains.map((train) => {
        const basePrice = classRates[travelClass] || 500;
        const totalPrice = basePrice * passengers;
        const availabilityStatus = train.availability?.[travelClass] || 'AVAILABLE';
        
        return (
          <Card key={train.number} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold text-lg">{train.number} - {train.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Train className="h-3 w-3 mr-1" />
                      Runs on: {train.runDays.join(', ')}
                    </div>
                  </div>
                  
                  <Badge variant={availabilityStatus === 'AVAILABLE' ? 'outline' : 'secondary'}>
                    {availabilityStatus}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-2xl font-bold">{train.departureTime}</div>
                    <div className="text-sm flex items-center text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {train.source}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">{train.duration}</div>
                    <div className="w-32 h-0.5 bg-muted relative">
                      <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
                        <div className="w-2 h-2 rounded-full bg-railway-primary"></div>
                        <div className="w-2 h-2 rounded-full bg-railway-secondary"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{train.arrivalTime}</div>
                    <div className="text-sm flex items-center justify-end text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {train.destination}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground mr-4">Duration: {train.duration}</span>
                    
                    <TicketPercent className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Class: {travelClass}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {totalPrice}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {passengers} {passengers > 1 ? 'passengers' : 'passenger'}
                    </div>
                  </div>
                  
                  <Button onClick={() => handleBooking(train)}>Book Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TrainList;
