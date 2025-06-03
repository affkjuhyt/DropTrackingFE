import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideIn: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHover: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

export const buttonTap: Variants = {
  tap: {
    scale: 0.95,
  },
};