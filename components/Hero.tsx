"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

import { useWeather } from "@/hooks/useWeather";
import CuratorWidget from "./CuratorWidget";

export default function Hero() {
  const weatherString = useWeather();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth) - 0.5;
      const yPct = (e.clientY / innerHeight) - 0.5;
      
      mouseX.set(xPct * 90); // Move 50px max
      mouseY.set(yPct * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Top Info */}
      <div className="relative z-10 flex justify-between items-start text-xs md:text-sm font-mono text-gray-400 ">
        <div className="flex flex-col gap-1">
          <CuratorWidget />
          <div className="flex flex-col gap-3 mt-8 max-w-[30%] border border-white/10 p-4 rounded-lg backdrop-blur-sm bg-black/20">
        
            <p className="text-xs leading-relaxed">
              Born from the idea of blending minimalism with bold authenticity, our playlists are curated for those who value quality over quantity. Every track tells a story and every beat reflects who you are.
            </p>
            <span className="block text-[10px] border border-white/20 rounded-full px-2 py-0.5 w-fit mb-2">
              © 2025 LYRA
            </span>
          </div>
        </div>
        <div className="text-left w-[50%]">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-none">
            © 99-25
          </h1>
          <p className="mt-2 text-[10px]">
            109° 47'28" — 110° 8'20" BT / 7° 32' — 7° 54' LS
          </p>
          <p className="mt-1 text-[10px]">{weatherString || "MON 2 DEC \\ 09:12 \\ 21°C"}</p>
        </div>
      </div>

      {/* Center Image & Text */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-8 h-full group">
        {/* Large Text Behind */}
        <div className="absolute inset-0 flex items-center justify-center z-0 ">
          <h2 className="text-[15vw] md:text-[24vw] bg-linear-[35deg,gray_10%,black_60%,gray] font-bold tracking-tighter select-none leading-none bg-clip-text text-transparent uppercase opacity-25 group-hover:hidden transition-all duration-300 ease-in-out">
            groove
          </h2>
          <h2 className="text-[15vw] md:text-[22vw] bg-linear-[35deg,gray_10%,black_60%,gray] font-bold tracking-tighter select-none leading-none bg-clip-text text-transparent uppercase opacity-25 hidden group-hover:block transition-all duration-300 ease-in-out">
            elevated
          </h2>
        </div>

        {/* Interactive Gradient */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-orange-200/30 to-orange-500/30 rounded-full blur-[200px] -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main Image - Absolute, Scaled, Interactive */}
        <motion.div 
          style={{ x, y }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="absolute z-10 w-full max-w-md md:max-w-lg aspect-[3/4] rounded-lg  transition-all duration-500 scale-150 -top-3 "
        >
          {/* Placeholder for the model image */}
          <div className="w-full h-full flex items-center justify-center">
             <Image
              src="/hero/webmodel2.png"
              alt="Model"
              fill
              style={{ objectFit: "cover" }}
              className="transition-all duration-500 scale-[1.3] grayscale hover:grayscale-0"
            />
          </div>
        </motion.div>
        
        {/* Foreground Text Overlay (Optional, for the "RAWLINE" effect over image) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-overlay">
          <h2 className="text-[15vw] md:text-[24vw] font-bold tracking-tighter text-white/20 select-none leading-none uppercase opacity-10 group-hover:hidden transition-all duration-300 ease-in-out">
            groove
          </h2>
          <h2 className="text-[15vw] md:text-[22vw] font-bold tracking-tighter text-white/20 select-none leading-none uppercase opacity-10 hidden group-hover:block transition-all duration-300 ease-in-out">
            elevated
          </h2>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 w-full overflow-hidden bg-lime-300 text-black py-2 rotate-10 -mr-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <h2 key={i} className="mx-4 text-lg font-bold uppercase flex items-center gap-2 justify-start">
              FOR THE USER, FOR THE CULTURE 
              <span className="w-full h-full">
                <span className="flex items-center justify-center w-8 h-8 pl-2">
                  <Image
                    src="/logos/lyra-symbol.svg"
                    alt="Lyra Symbol"
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </span>
              </span>
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
