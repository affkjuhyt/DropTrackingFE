import { motion } from 'framer-motion';
import { buttonTap } from '@/animations/variants';
import { HTMLMotionProps } from 'framer-motion';
import { IconName } from '@/config/icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Icon, LoadingIcon } from '../shadcn/icon';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const iconSizes: Record<typeof size, SizeProp> = {
    sm: 'sm',
    md: '1x',
    lg: 'lg',
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIcon />;
    }

    const iconElement = icon && (
      <Icon name={icon} size={iconSizes[size]} />
    );

    return (
      <>
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </>
    );
  };

  return (
    <motion.button
      whileTap="tap"
      variants={buttonTap}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {renderContent()}
    </motion.button>
  );
};
