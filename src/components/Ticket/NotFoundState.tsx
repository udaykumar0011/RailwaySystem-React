
import React from 'react';
import { TicketCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFoundState: React.FC = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardContent className="pt-6 text-center">
        <div className="mb-4">
          <TicketCheck className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <h2 className="text-xl font-bold">Ticket Not Found</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          We couldn't find a ticket with the provided PNR number. 
          Please check the PNR and try again.
        </p>
        <Button variant="outline">Go to Home</Button>
      </CardContent>
    </Card>
  );
};

export default NotFoundState;
