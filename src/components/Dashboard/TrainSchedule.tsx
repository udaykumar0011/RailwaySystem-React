
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TrainScheduleProps {
  schedules: {
    id: string;
    trainNumber: string;
    route: string;
    departureTime: string;
    arrivalTime: string;
    platform: string;
    status: 'On Time' | 'Delayed' | 'Cancelled' | 'Boarding';
  }[];
}

const TrainSchedule: React.FC<TrainScheduleProps> = ({ schedules }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'On Time':
        return 'bg-green-100 text-green-800';
      case 'Delayed':
        return 'bg-amber-100 text-amber-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Boarding':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="railway-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Today's Train Schedule</h2>
        <button className="text-sm text-railway-accent">View All</button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train #</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                <TableCell>{schedule.route}</TableCell>
                <TableCell>{schedule.departureTime}</TableCell>
                <TableCell>{schedule.arrivalTime}</TableCell>
                <TableCell>{schedule.platform}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TrainSchedule;
