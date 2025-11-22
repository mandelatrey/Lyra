import { ArrowUpRight } from "lucide-react";

export default function GridSection() {
  return (
    <section className="w-full bg-black text-white py-12 universal-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-12 border-b border-white/10 pb-4">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
            <span className="text-gray-500 text-sm align-top mr-2">[76]</span>
            T-SHIRTS
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
            THE ESSENTIALS
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
            <span className="text-gray-500 text-sm align-top mr-2">[42]</span>
            HOODIES
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item 1: Red Sempit */}
          <div className="md:col-span-1 bg-gray-900 rounded-lg p-6 relative overflow-hidden group h-[400px]">
             <div className="absolute top-6 left-6 z-10">
                <p className="text-xs text-gray-400 mb-2">SEE FOR THIS ARTICLES <ArrowUpRight className="inline w-3 h-3" /></p>
             </div>
             <div className="absolute bottom-6 left-6 z-10">
                <div className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                   <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                   <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                </div>
             </div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-5xl font-bold leading-none text-right">
                   Red<br/>Sempit<br/>1987
                </h3>
             </div>
          </div>

          {/* Item 2: Summer Articles (Center Large) */}
          <div className="md:col-span-1 bg-gray-900 rounded-lg p-6 relative overflow-hidden group h-[400px]">
             <div className="absolute top-6 left-6 z-10">
                <span className="text-xs text-gray-500">[COLLECTIONS]</span>
                <h3 className="text-2xl font-bold mt-2">Summer<br/>Articles</h3>
             </div>
             <div className="absolute bottom-6 right-6 z-10 text-right">
                 <span className="text-accent font-handwriting text-xl rotate-[-10deg] block">Foshan</span>
                 <span className="text-accent font-handwriting text-xl rotate-[-5deg] block">Shunde</span>
             </div>
             {/* Placeholder for product image */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center">
                   <span className="text-xs text-gray-500">Product Image</span>
                </div>
             </div>
          </div>

          {/* Item 3: Designed for Life */}
          <div className="md:col-span-1 bg-gray-900 rounded-lg p-6 relative overflow-hidden group h-[400px] flex flex-col justify-between">
             <div className="text-right">
                <p className="text-xs text-gray-400 mb-2">SEE FOR THIS ARTICLES <ArrowUpRight className="inline w-3 h-3" /></p>
             </div>
             <div>
                <h3 className="text-4xl font-bold leading-none mb-4">
                   Designed for<br/>Life — Meets<br/>Elegance
                </h3>
                <div className="flex flex-wrap gap-2">
                   {["ALL", "HOODIES", "T-SHIRTS", "ACCESSORIES"].map(tag => (
                      <span key={tag} className="text-[10px] border border-white/20 rounded-full px-2 py-1 hover:bg-white hover:text-black cursor-pointer transition-colors">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>
          </div>

          {/* Item 4: Bottom Left Image */}
          <div className="md:col-span-1 bg-gray-800 rounded-lg h-[300px] relative overflow-hidden group">
             <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-1 rounded">[$316.00]</span>
             </div>
             <div className="absolute bottom-4 left-4 z-10">
                 <p className="text-xs font-bold">The Porter Off-Race T-Shirt</p>
                 <a href="#" className="text-[10px] text-accent flex items-center gap-1 mt-1">SHOP COLLECTION <ArrowUpRight className="w-2 h-2"/></a>
             </div>
             <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent absolute inset-0 z-0"></div>
          </div>

          {/* Item 5: Bottom Center Text */}
          <div className="md:col-span-1 bg-gray-900 rounded-lg h-[300px] p-6 relative overflow-hidden flex flex-col justify-between">
             <span className="text-xs text-gray-500">[COLLECTION]</span>
             <h3 className="text-4xl font-bold tracking-tighter leading-none">
                Explore<br/>Off-Race<br/>Autumn/
             </h3>
             <div className="text-right">
                <span className="text-4xl font-bold text-gray-700">Winter</span>
             </div>
          </div>

           {/* Item 6: Bottom Right Image */}
           <div className="md:col-span-1 bg-gray-800 rounded-lg h-[300px] relative overflow-hidden group">
             <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-1 rounded">[$316.00]</span>
             </div>
             <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent absolute inset-0 z-0"></div>
             <div className="absolute bottom-4 right-4 z-10">
                <span className="text-accent text-xs">The Down Jacket</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
