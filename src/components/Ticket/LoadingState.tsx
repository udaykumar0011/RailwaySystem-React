
import React from 'react';
import { TicketCheck } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="text-center">
      <TicketCheck className="h-12 w-12 text-muted-foreground animate-pulse mx-auto mb-4" />
      <p className="text-muted-foreground">Loading ticket information...</p>
    </div>
  );
};

export default LoadingState;
