"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function CuratorWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();

  // Fallback to a default if no user (though AuthContext should provide one)
  const curator = user || {
    name: "Guest Curator",
    avatar: "/hero/webmodel2.png",
    location: "Unknown",
    currentPlaylist: "Guest Mix",
    status: "offline"
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 cursor-pointer group">
        <span className="text-accent group-hover:text-white transition-colors duration-300">
          Now Curating: [{curator.currentPlaylist}]
        </span>
        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 relative">
             <Image
                src={curator.avatar}
                alt="Curator"
                fill
                className="object-cover"
              />
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-4 w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 z-50 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative flex-shrink-0">
                <Image
                    src={curator.avatar}
                    alt="Curator"
                    fill
                    className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold leading-none">{curator.name}</h3>
                <p className="text-gray-400 text-[10px] mt-1">{curator.location}</p>
                <div className="mt-2 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${curator.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                    <p className="text-accent text-[10px] capitalize">{curator.status} Now</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-gray-300 text-[10px] leading-relaxed">
                    "Curating the smoothest tracks for your vibe. Enjoy the selection."
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
