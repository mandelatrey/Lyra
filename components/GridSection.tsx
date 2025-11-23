'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { shopData, ShopItem } from "./shopData";
import { useCursor } from "@/context/CursorContext";

export default function GridSection() {
  return (
    <section className="w-full bg-black text-white py-24 universal-padding">
      <div className="max-w-7xl mx-auto space-y-32">
        <SectionWithCarousel id="discover" title="Discover" index="01" category="Discover" items={shopData["Discover"]} />
        <SectionWithCarousel id="charts" title="Charts" index="02" category="Charts" items={shopData["Charts"]} />
        <SectionWithCarousel id="editors" title="Editors" index="03" category="Editors" items={shopData["Editors"]} />
        <SectionWithCarousel id="merch" title="Shop" index="04" category="Shop" items={shopData["Shop"]} />
      </div>
    </section>
  );
}

const SectionWithCarousel = ({ title, index, category, items, id }: { title: string, index: string, category: string, items: ShopItem[], id?: string }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();
  // Duplicate items to create an "infinite" scroll feel
  const extendedItems = Array(10).fill(items).flat();

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      
      if (firstCard) {
         // Calculate width of one item including gap
         const cardWidth = firstCard.offsetWidth;
         const gap = 16; // gap-4 is 1rem = 16px
         const itemTotalWidth = cardWidth + gap;
         
         // Calculate width of one original set of items
         const singleSetWidth = itemTotalWidth * items.length;
         
         // Scroll to the start of the 5th set (middle of the 10 sets)
         // This ensures we start perfectly aligned with the first item of a set
         // and have plenty of scroll space in both directions
         container.scrollLeft = singleSetWidth * 4;
      }
    }
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      const scrollAmount = firstCard ? (firstCard.offsetWidth + 16) : 400;
      
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div id={id} className="space-y-8 scroll-mt-32">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div className="flex items-baseline gap-4">
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">{title}</h2>
           <span className="text-sm text-gray-500">[{index}]</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            onMouseEnter={() => setCursorVariant('hidden')}
            onMouseLeave={() => setCursorVariant('default')}
            className="p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            onMouseEnter={() => setCursorVariant('hidden')}
            onMouseLeave={() => setCursorVariant('default')}
            className="p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-4 px-4 md:mx-0 md:px-0">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {extendedItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="min-w-[85vw] md:min-w-[350px] snap-start">
              <GridCard item={item} category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const GridCard = ({ item, category }: { item: ShopItem; category: string }) => {
  const { setCursorVariant, setCursorText } = useCursor();

  const handleMouseEnter = () => {
    if (category === "Shop") {
      setCursorVariant("shop");
      setCursorText("SHOP");
    } else {
      setCursorVariant("listen");
      setCursorText("LISTEN");
    }
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-gray-900 rounded-2xl relative overflow-hidden group h-[400px] w-full cursor-none ${
        item.type === "simple" ? "h-[300px]" : ""
      } ${item.colSpan}`}
    >
       {/* Top Left Badge */}
        <div className="absolute top-4 left-4 z-20">
          {(item.price || item.subtitle) ? (
            <span className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-1 rounded uppercase tracking-wider font-medium text-white">
              {item.price || item.subtitle}
            </span>
          ) : (
             <span className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-1 rounded uppercase tracking-wider font-medium text-white">
                {item.type === 'feature' ? 'FEATURE' : 'NEW'}
             </span>
          )}
        </div>

        {/* Background Image */}
        {item.image && (
          <Image 
            src={item.image} 
            alt="Background" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" 
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 z-20 right-4">
          <h3 className="text-lg font-bold leading-tight mb-2 text-white w-full">
            {item.title}
          </h3>
          
          {item.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] border border-white/20 rounded-full px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-default text-white">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-wider">
            {category === "Shop" ? "BUY NOW" : "LISTEN"} <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Extra Content */}
        {item.extra}
    </motion.div>
  );
};
