
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Train } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { indianRailwayStations, popularRoutes } from '@/lib/train-data';

interface BookingFormProps {
  isTatkal: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ isTatkal }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [passengers, setPassengers] = useState<string>('1');
  const [travelClass, setTravelClass] = useState<string>('SL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!source || !destination || !date) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (source === destination) {
      toast.error('Source and destination cannot be the same');
      return;
    }

    // Navigate to the train selection page with search parameters
    navigate(`/train-selection?from=${source}&to=${destination}&date=${format(date, 'yyyy-MM-dd')}&passengers=${passengers}&class=${travelClass}`);
  };

  const handleQuickSelect = (route: {from: string, to: string}) => {
    setSource(route.from);
    setDestination(route.to);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">{isTatkal ? 'Tatkal Booking' : 'Regular Booking'}</h2>
          <p className="text-sm text-muted-foreground">
            {isTatkal 
              ? 'Book tickets one day in advance (opens at 10:00 AM for AC classes and 11:00 AM for non-AC)' 
              : 'Book tickets up to 120 days in advance'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="source" className="text-sm font-medium">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select source station" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {indianRailwayStations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select destination station" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {indianRailwayStations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Journey</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="passengers" className="text-sm font-medium">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="class" className="text-sm font-medium">Travel Class</label>
                <div className="relative">
                  <Train className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Select value={travelClass} onValueChange={setTravelClass}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1A">1A - First AC</SelectItem>
                      <SelectItem value="2A">2A - Second AC</SelectItem>
                      <SelectItem value="3A">3A - Third AC</SelectItem>
                      <SelectItem value="SL">SL - Sleeper</SelectItem>
                      <SelectItem value="2S">2S - Second Sitting</SelectItem>
                      <SelectItem value="CC">CC - Chair Car</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Search Trains</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Popular Routes</h3>
          <div className="flex flex-wrap gap-2">
            {popularRoutes.slice(0, 6).map((route, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickSelect(route)}
                className="text-xs"
              >
                {route.from} → {route.to}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
