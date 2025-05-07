
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Train } from 'lucide-react';

interface TicketDetailsProps {
  ticket: {
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
    bookingDate: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
      seat: string;
      status: string;
    }>;
  };
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="bg-railway-primary text-white p-4">
        <div className="flex justify-between">
          <div>
            <div className="text-sm opacity-90">PNR Number</div>
            <div className="text-xl font-mono font-bold">{ticket.pnr}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Booking Date</div>
            <div>{ticket.bookingDate}</div>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Train Number/Name</div>
              <div className="font-medium flex items-center">
                <Train className="h-4 w-4 mr-1 text-muted-foreground" />
                {ticket.trainNumber} - {ticket.trainName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Class</div>
              <div className="font-medium">{ticket.travelClass}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{ticket.departureTime}</div>
              <div className="text-sm text-muted-foreground">{ticket.date}</div>
              <div className="font-medium mt-1">{ticket.fromStation} ({ticket.from})</div>
            </div>
            
            <div className="flex-1 mx-4 px-4">
              <div className="w-full h-0.5 bg-muted relative">
                <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-railway-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-railway-secondary"></div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">{ticket.arrivalTime}</div>
              <div className="text-sm text-muted-foreground">{ticket.date}</div>
              <div className="font-medium mt-1">{ticket.toStation} ({ticket.to})</div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <PassengerTable passengers={ticket.passengers} coach={ticket.coach} />
      </CardContent>
    </Card>
  );
};

interface PassengerTableProps {
  passengers: Array<{
    name: string;
    age: number;
    gender: string;
    seat: string;
    status: string;
  }>;
  coach: string;
}

const PassengerTable: React.FC<PassengerTableProps> = ({ passengers, coach }) => {
  return (
    <div>
      <h3 className="font-medium mb-3">Passenger Details</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="pb-2 text-left">Name</th>
              <th className="pb-2 text-left">Age</th>
              <th className="pb-2 text-left">Gender</th>
              <th className="pb-2 text-left">Coach</th>
              <th className="pb-2 text-left">Seat</th>
              <th className="pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-3">{passenger.name}</td>
                <td className="py-3">{passenger.age}</td>
                <td className="py-3">{passenger.gender}</td>
                <td className="py-3">{coach}</td>
                <td className="py-3">{passenger.seat}</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded">
                    {passenger.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketDetails;
