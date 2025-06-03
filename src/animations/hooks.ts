import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -100px 0px',
  });

  return { ref, isInView };
};

export const useAnimationConfig = () => {
  return {
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  };
};