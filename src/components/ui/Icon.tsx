import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@/config/icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  name: IconName;
  size?: SizeProp;
  className?: string;
  spin?: boolean;
  pulse?: boolean;
  onClick?: () => void;
}

export const Icon = ({
  name,
  size = '1x',
  className = '',
  spin = false,
  pulse = false,
  onClick,
}: IconProps) => {
  return (
    <FontAwesomeIcon
      icon={name}
      size={size}
      className={`transition-colors duration-200 ${className}`}
      spin={spin}
      pulse={pulse}
      onClick={onClick}
    />
  );
};

// Specialized icon components for common use cases
export const LoadingIcon = () => (
  <Icon name="spinner" spin className="text-blue-500" />
);

export const ErrorIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="exclamation-circle" className={`text-red-500 ${className}`} />
);

export const SuccessIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="check" className={`text-green-500 ${className}`} />
);

export const InfoIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="info-circle" className={`text-blue-500 ${className}`} />
);