import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  value?: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  children?: ReactNode;
  className?: string;
}

export function Card({
  title,
  subtitle,
  icon,
  value,
  trend,
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      <div className="p-5">
        {(title || icon) && (
          <div className="flex items-center">
            {icon && (
              <div className="flex-shrink-0">
                <div className="h-6 w-6 text-gray-400">{icon}</div>
              </div>
            )}
            {title && (
              <div className={`${icon ? 'ml-5' : ''} w-0 flex-1`}>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {title}
                  </dt>
                  {value && (
                    <dd className="text-lg font-medium text-gray-900">
                      {value}
                    </dd>
                  )}
                </dl>
              </div>
            )}
          </div>
        )}

        {subtitle && (
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        )}

        {trend && (
          <div className="mt-2">
            <span
              className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="ml-2 text-sm text-gray-500">from previous period</span>
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}