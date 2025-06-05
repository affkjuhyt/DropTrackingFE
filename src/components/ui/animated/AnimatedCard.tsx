import { motion } from 'framer-motion';
import { cardHover, fadeIn } from '@/animations/variants';
import { useScrollAnimation } from '@/animations/hooks';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({ children, className = '', delay = 0 }: AnimatedCardProps) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={{
        ...fadeIn,
        hover: cardHover.hover
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      transition={{ duration: 0.3, delay }}
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};