
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface FareDetailsProps {
  fare: number;
}

export const FareDetails: React.FC<FareDetailsProps> = ({ fare }) => {
  const reservationCharges = 40;
  const superfastCharges = 45;
  const gst = Math.round(fare * 0.05);
  const totalFare = fare + reservationCharges + superfastCharges + gst;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-3">Fare Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base Fare</span>
            <span>₹ {fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reservation Charges</span>
            <span>₹ {reservationCharges}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Superfast Charges</span>
            <span>₹ {superfastCharges}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST</span>
            <span>₹ {gst}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total Fare</span>
            <span>₹ {totalFare}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ImportantInfo: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-3">Important Information</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Please carry the original ID card of any one passenger mentioned on the ticket.</li>
          <li>• E-ticket cancellations can be done online before chart preparation.</li>
          <li>• This ticket is booked under Indian Railways General Rules of Refund.</li>
          <li>• Arrive at the station at least 30 minutes before departure.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

interface TicketSummaryProps {
  fare: number;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ fare }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FareDetails fare={fare} />
      <ImportantInfo />
    </div>
  );
};

export default TicketSummary;
