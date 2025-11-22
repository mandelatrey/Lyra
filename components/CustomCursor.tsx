'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import Image from 'next/image';
import { useCursor } from '@/context/CursorContext';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const { cursorVariant, cursorText } = useCursor();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 500, mass: 0.05 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  const variants: Variants = {
    default: {
      height: 56,
      width: 56,
      backgroundColor: "rgba(209, 213, 219, 0.7)", // gray-300/70
      mixBlendMode: "normal",
    },
    listen: {
      height: 100,
      width: 100,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
    },
    shop: {
      height: 100,
      width: 100,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
    },
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full overflow-hidden"
    >
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
         {cursorVariant === 'default' ? (
            <Image
              src="/logos/lyra-symbol.svg"
              alt="Cursor"
              width={50}
              height={50}
              className="w-3/4 h-3/4 object-contain"
            />
         ) : (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-black font-mono font-bold text-sm uppercase tracking-widest"
            >
              {cursorText || (cursorVariant === 'shop' ? 'BUY NOW' : 'LISTEN')}
            </motion.span>
         )}
      </motion.div>
    </motion.div>
  );
}
