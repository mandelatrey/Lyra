import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-24 text-xs md:text-sm font-mono text-gray-400">
          <span>[OUR STORY]</span>
          <span>scroll down</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight">
              Founded on the principles of quality, detail, and timeless design,{" "}
              <span className="text-gray-500">we create pieces that blend modern</span>{" "}
              <span className="inline-flex items-center justify-center bg-accent text-black rounded-full w-9 h-9 mx-1 align-middle p-2">
                <Image
                  src="/logos/lyra-symbol.svg"
                  alt="Lyra Symbol"
                  width={70}
                  height={70}
                  className="w-full h-full object-contain"
                 />
              </span>{" "}
              <span className="text-gray-500">aesthetics with everyday functionality.</span>
            </h2>
            
            <div className="mt-12 text-xs md:text-sm font-mono text-gray-400">
              / ESTABLISHED SINCE 1999
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between h-full">
             <div className="w-full aspect-square bg-gray-800 rounded-lg overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all">
                {/* Placeholder for small image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-black"></div>
             </div>
             
             <div className="flex flex-col gap-8">
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                  Whether it's an elevated basic or a statement piece, our collections are crafted to empower confidence and celebrate individuality.
                </p>
                
                <a href="#" className="text-accent text-xs font-bold uppercase flex items-center gap-1 hover:underline">
                  MORE ABOUT US <ArrowUpRight className="w-3 h-3" />
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
