'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Disc } from 'lucide-react';

interface Album {
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
}

export default function AlbumStack() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/search?term=amapiano+rnb+hiphop&entity=album&limit=15');
        const data = await res.json();
        // Filter out albums without artwork and reverse to stack correctly (first item on top)
        const validAlbums = data.results.filter((a: any) => a.artworkUrl100).reverse();
        setAlbums(validAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const removeCard = (id: number) => {
    setAlbums((prev) => prev.filter((album) => album.collectionId !== id));
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-800 rounded-3xl flex items-center justify-center animate-pulse">
        <Disc className="w-8 h-8 text-gray-600 animate-spin" />
      </div>
    );
  }

  if (albums.length === 0) {
    return (
        <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
            <p className="text-xs text-gray-500">No albums found.</p>
        </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {albums.map((album, index) => {
           const isTop = index === albums.length - 1;
           return (
            <Card 
                key={album.collectionId} 
                album={album} 
                isTop={isTop} 
                onRemove={() => removeCard(album.collectionId)}
                index={index}
                total={albums.length}
            />
           )
        })}
      </AnimatePresence>
       {/* Empty State Background (visible when all cards are gone) */}
       <div className="absolute inset-0 bg-gray-900 rounded-3xl flex items-center justify-center -z-10">
          <span className="text-xs text-gray-600">End of stack</span>
       </div>
    </div>
  );
}

function Card({ album, isTop, onRemove, index, total }: { album: Album; isTop: boolean; onRemove: () => void; index: number; total: number }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Calculate offset for stacking effect
  // The top card is at 0, 0.
  // The card below it (total - 2) should be slightly offset.
  const reverseIndex = total - 1 - index;
  const yOffset = 0; // No vertical offset for a "pile" look
  const scale = 1; // No scaling down
  
  // Rotation for stacked cards
  // Random-ish rotation based on index to create a messy pile look
  // We use a pseudo-random pattern based on index
  const rotations = [0, 5, -5, 10, -8, 3, -3];
  const stackRotation = reverseIndex === 0 ? 0 : rotations[index % rotations.length];

  // Only show the top 3 cards under the main one (total 4 visible)
  if (reverseIndex > 3) return null;

  return (
    <motion.div
      style={{ 
        x: isTop ? x : 0, 
        rotate: isTop ? rotate : stackRotation,
        zIndex: index,
        y: yOffset,
        scale: scale,
        opacity: isTop ? opacity : 1 - reverseIndex * 0.1
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onRemove();
        }
      }}
      className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-gray-800/10 cursor-grab active:cursor-grabbing bg-gray-800 group"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: scale, 
        opacity: 1 - reverseIndex * 0.1, 
        y: yOffset,
        rotate: isTop ? 0 : stackRotation 
      }}
      exit={{ x: x.get() < 0 ? -200 : 200, opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* High Res Artwork (using 600x600 by replacing URL) */}
      <Image
        src={album.artworkUrl100.replace('100x100bb', '600x600bb')}
        alt={album.collectionName}
        fill
        className="object-cover pointer-events-none"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 pointer-events-none w-full h-full">
        {isTop && (
          <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-gray-700/30 p-2 size-25 flex items-center justify-center group-hover:hidden transition-all duration-400 ease-in">
              <p className="text-white/75 font-mono text-sm">Drag Me</p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1 place-items-start absolute bottom-4 left-4 max-w-[80%]">
          <h3 className="text-sm font-semibold bg-gradient-to-br from-lime-100 to-gray-700 bg-clip-text text-transparent leading-tight line-clamp-2 mb-1 text-left ">
            {album.collectionName}
          </h3>
          <p className="text-xs text-gray-300/70 font-medium truncate text-left">
            {album.artistName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
