import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Top Info */}
      <div className="relative z-10 flex justify-between items-start text-xs md:text-sm font-mono text-gray-400">
        <div className="flex flex-col gap-1">
          <span className="text-accent">[RACE AUTUMN - WINTER 2025]</span>
          <div className="mt-8 max-w-xs border border-white/10 p-4 rounded-lg backdrop-blur-sm bg-black/20">
            <span className="block text-[10px] border border-white/20 rounded-full px-2 py-0.5 w-fit mb-2">
              ©2025 RAWLINE
            </span>
            <p className="text-[10px] leading-relaxed">
              We believe fashion is more than what you wear — it's how you
              express yourself. Born from the idea of blending minimalism with
              proud, our collections are designed for those who value quality.
            </p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-none">
            ©99-25
          </h1>
          <p className="mt-2 text-[10px]">
            109° 47'28" — 110° 8'20" BT / 7° 32' — 7° 54' LS
          </p>
          <p className="mt-1 text-[10px]">MON 2 DEC \ 09:12 \ 21°C</p>
        </div>
      </div>

      {/* Center Image & Text */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-8">
        {/* Large Text Behind */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <h2 className="text-[15vw] md:text-[22vw] font-bold tracking-tighter text-white/10 select-none leading-none">
            RAWLINE
          </h2>
        </div>

        {/* Main Image */}
        <div className="relative z-10 w-full max-w-md md:max-w-lg aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder for the model image */}
          <div className="w-full h-full bg-gradient-to-b from-gray-700 to-black flex items-center justify-center">
             <span className="text-white/20 text-lg">Model Image</span>
          </div>
        </div>
        
        {/* Foreground Text Overlay (Optional, for the "RAWLINE" effect over image) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-overlay">
           <h2 className="text-[15vw] md:text-[22vw] font-bold tracking-tighter text-white/80 select-none leading-none">
            RAWLINE
          </h2>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 w-full overflow-hidden bg-accent text-black py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4 text-xs font-bold uppercase flex items-center gap-2">
              FROM THE CITY, FOR THE CULTURE <span className="text-xl">❖</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
