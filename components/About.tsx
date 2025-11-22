'use client';

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

import AlbumStack from "./AlbumStack";
import { motion } from "framer-motion";

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;
    
    // const children = headingRef.current.children;
    const split = new SplitText(headingRef.current, {
      type: "words, chars, lines",
      wordsClass: "inline-block",
    });
    
    gsap.fromTo(
      split.lines,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.25,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        
      }
    );
  }, { scope: headingRef });

  return (
    <section className="relative w-full bg-black text-white py-24 universal-padding border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-24 text-xs md:text-sm font-mono text-gray-400">
          <span>[Why Even?]</span>
          <span>well, scroll down</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 max-w-[65%]">
            <h2 ref={headingRef} className="text-3xl md:text-5xl font-medium leading-tight tracking-tight">
              <span>Founded on the principles of vibes, and fun</span>{" "}
              <span className="inline-flex items-center justify-center bg-accent text-black rounded-full w-9 h-9 mx-1 align-middle p-2">
                <Image
                  src="/logos/lyra-symbol.svg"
                  alt="Lyra Symbol"
                  width={70}
                  height={70}
                  className="w-full h-full object-contain"
                 />
              </span>{" "}
              <span className="text-gray-500"> Our playlists blend classic</span>{" "}
              <span className="text-gray-500">rhythms with modern tastes.</span>
            </h2>
            
            <div className="mt-12 text-xs md:text-sm font-mono text-gray-400">
              / ESTABLISHED 2025 CE
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.3, ease: [0.32, 1, 0.36, 1] }}
            className="md:col-span-4 flex flex-col justify-between h-full"
          >
             <div className="w-full aspect-square bg-gray-800 rounded-3xl mb-8 relative">
                <AlbumStack />
             </div>
             
             <div className="flex flex-col gap-8">
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                  We have something for every mood, every occasion, and every vibe.
                </p>
                
                <a href="#" className="text-accent text-xs font-bold uppercase flex items-center gap-1 hover:underline">
                  Discover Music <ArrowUpRight className="w-3 h-3" />
                </a>
             </div>
             </motion.div>
          </div>
        </div>
    </section>
  );
}
