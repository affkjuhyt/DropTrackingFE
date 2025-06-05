import { motion } from 'framer-motion';
import { staggerContainer, listItem } from '@/animations/variants';

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  as?: 'ul' | 'div';
  layout?: boolean;
}

export const AnimatedList = ({
  children,
  className = '',
  as = 'div',
  layout = true,
}: AnimatedListProps) => {
  const Component = motion[as];

  return (
    <Component
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      layout={layout}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={listItem}
          layout={layout}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
          }}
        >
          {child}
        </motion.div>
      ))}
    </Component>
  );
};

export const AnimatedGrid = ({
  children,
  className = '',
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: AnimatedListProps & { columns?: string }) => {
  return (
    <AnimatedList
      className={`grid gap-4 ${columns} ${className}`}
    >
      {children}
    </AnimatedList>
  );
};