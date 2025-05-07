
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  icon,
  bgColor = 'bg-railway-primary/10'
}) => {
  return (
    <div className="railway-card flex items-center gap-4">
      <div className={`p-3 rounded-md ${bgColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
        {change && (
          <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-railway-secondary'} flex items-center gap-1`}>
            {isPositive ? '↑' : '↓'} {change} from last month
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
