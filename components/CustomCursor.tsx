'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
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

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
    >
      <span className="inline-flex items-center justify-center bg-gray-300/70 text-black rounded-full size-14 p-3">
        <Image
          src="/logos/lyra-symbol.svg"
          alt="Cursor"
          width={50}
          height={50}
          className="w-full h-full object-contain"
        />
      </span>
    </motion.div>
  );
}
