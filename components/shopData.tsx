import React from "react";

export type Category = "Discover" | "Charts" | "Editors" | "Shop";

export interface ShopItem {
  id: string;
  title: React.ReactNode;
  subtitle?: string;
  price?: string;
  tags?: string[];
  imageColor: string;
  image?: string;
  colSpan: "md:col-span-1" | "md:col-span-2";
  type: "product" | "collection" | "feature" | "simple";
  extra?: React.ReactNode;
}

export const categories: Category[] = ["Discover", "Charts", "Editors", "Shop"];

export const shopData: Record<Category, ShopItem[]> = {
  "Discover": [
    {
      id: "d1",
      title: "Weekly Discovery Mix",
      subtitle: "[CURATED FOR YOU]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-purple-600",
      image: "/grid/discover-weekly.png",
      extra: (
        <div className="absolute bottom-6 right-6 z-10 text-right">
           <span className="text-accent font-handwriting text-xl rotate-[-10deg] block">Fresh</span>
           <span className="text-accent font-handwriting text-xl rotate-[-5deg] block">Finds</span>
        </div>
      )
    },
    {
      id: "d2",
      title: "Hidden Gems Radar",
      colSpan: "md:col-span-1",
      type: "product", // Using product style for visual variety
      imageColor: "bg-indigo-500",
      price: "NEW",
      image: "/grid/hidden-gems.png",
    },
    {
      id: "d3",
      title: "Genre Fluid Vibes",
      colSpan: "md:col-span-1",
      type: "feature",
      imageColor: "bg-gray-900",
      tags: ["JAZZ", "LO-FI", "NEO-SOUL"],
      image: "/grid/smoof.png",
    },
    {
      id: "d4",
      title: "Morning Coffee",
      price: "[PLAYLIST]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-amber-700",
      image: "/grid/morning-coffee.png",
    },
    {
      id: "d5",
      title: "Late Night Drive",
      subtitle: "[MOOD]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-blue-900",
      image: "/grid/night-drive.jpg",
    },
    {
      id: "d6",
      title: "Focus Flow",
      price: "[PLAYLIST]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-teal-800",
      image: "/grid/focus.jpg",
    }
  ],
  "Charts": [
    {
      id: "c1",
      title: "Global Top 50",
      colSpan: "md:col-span-1",
      type: "product",
      imageColor: "bg-green-600",
      price: "#1",
      image: "/grid/the-charts.png",
    },
    {
      id: "c2",
      title: "Viral Hits Now",
      subtitle: "[TRENDING]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-pink-600",
      image: "/grid/viral.jpg",
    },
    {
      id: "c3",
      title: "Regional Pulse Radar",
      colSpan: "md:col-span-1",
      type: "feature",
      imageColor: "bg-gray-900",
      tags: ["TOKYO", "NYC", "LONDON"],
      image: "/grid/radar.jpg",
    },
    {
      id: "c4",
      title: "Indie Rock Top 20",
      price: "[CHART]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-rose-800",
      image: "/grid/indie.jpg",
    },
    {
      id: "c5",
      title: "Future Bass Elite",
      subtitle: "[GENRE]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-cyan-700",
      image: "/grid/bass.jpg",
    },
    {
      id: "c6",
      title: "Hip Hop Hotlist",
      price: "[CHART]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-orange-800",
      image: "/grid/hip.jpg",
    }
  ],
  "Editors": [
    {
      id: "e1",
      title: "Xonia's Monthly Picks",
      colSpan: "md:col-span-1",
      type: "product",
      imageColor: "bg-fuchsia-600",
      price: "STAFF",
      image: "/grid/sarah.jpg",
    },
    {
      id: "e2",
      title: "The Sound Lab",
      subtitle: "[EXPERIMENTAL]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-violet-600",
      image: "/grid/soundlab.png",
    },
    {
      id: "e3",
      title: "Artist Spotlight Series",
      colSpan: "md:col-span-1",
      type: "feature",
      imageColor: "bg-gray-900",
      tags: ["INTERVIEWS", "DEEP DIVES", "B-SIDES"],
      image: "/grid/artist.jpg",
    },
    {
      id: "e4",
      title: "Guest Curator: DJ Four Tet",
      price: "[FEATURE]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-emerald-800",
      image: "/grid/fourtet.jpg",
    },
    {
      id: "e5",
      title: "Vinyl Lovers Club",
      subtitle: "[ANALOG]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-stone-700",
      image: "/grid/vinyl.jpg",
    },
    {
      id: "e6",
      title: "Critic's Choice 2024",
      price: "[REVIEW]",
      colSpan: "md:col-span-1",
      type: "simple",
      imageColor: "bg-red-900",
      image: "/grid/xtics2.png",
    }
  ],
  "Shop": [
    {
      id: "m1",
      title: "Lyra Signature Tee",
      colSpan: "md:col-span-1",
      type: "product",
      imageColor: "bg-neutral-100",
      price: "$35.00",
      image: "/grid/merch-1.png",
    },
    {
      id: "m2",
      title: "Listening Kit",
      subtitle: "[ESSENTIALS]",
      colSpan: "md:col-span-1",
      type: "collection",
      imageColor: "bg-zinc-800",
      image: "/grid/listeningkit.png",
      extra: (
        <div className="absolute bottom-6 right-6 z-10 text-right">
           <span className="text-accent font-handwriting text-xl rotate-[-10deg] block">High</span>
           <span className="text-accent font-handwriting text-xl rotate-[-5deg] block">Fidelity</span>
        </div>
      )
    },
    {
      id: "m3",
      title: "Limited Vinyl Drops",
      colSpan: "md:col-span-1",
      type: "feature",
      imageColor: "bg-gray-900",
      tags: ["COLORED", "SIGNED", "RARE"],
      image: "/grid/vinyl-2.png",
    },
  ]
};
