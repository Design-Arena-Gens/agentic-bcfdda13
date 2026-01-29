import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  bgColor?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  bgColor = 'bg-primary-50',
  iconColor = 'text-primary-600'
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                trendUp ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`${bgColor} p-4 rounded-full`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
