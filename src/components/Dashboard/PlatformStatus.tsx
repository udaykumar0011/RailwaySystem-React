
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Platform {
  id: string;
  number: string;
  trainNumber?: string;
  occupiedUntil?: string;
  nextArrival?: string;
  utilization: number;
}

interface PlatformStatusProps {
  platforms: Platform[];
}

const PlatformStatus: React.FC<PlatformStatusProps> = ({ platforms }) => {
  const getUtilizationColor = (utilization: number): string => {
    if (utilization >= 80) return 'bg-railway-secondary';
    if (utilization >= 50) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="railway-card">
      <h2 className="text-lg font-medium mb-4">Platform Status</h2>
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Platform {platform.number}</span>
                {platform.trainNumber && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    Train #{platform.trainNumber}
                  </span>
                )}
              </div>
              <div className="text-sm">
                {platform.utilization}% Utilized
              </div>
            </div>
            <Progress 
              value={platform.utilization} 
              className={`h-2 [&>div]:${getUtilizationColor(platform.utilization)}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {platform.trainNumber 
                  ? `Occupied until ${platform.occupiedUntil}` 
                  : 'Available'}
              </span>
              {!platform.trainNumber && platform.nextArrival && (
                <span>Next arrival: {platform.nextArrival}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformStatus;
