'use client';

import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "DISCOVER", href: "#" },
  { name: "CHARTS", href: "#" },
  { name: "PODCASTS", href: "#" },
  { name: "EDITORS", href: "#" },
  { name: "PHILOSOPHY", href: "#" },
];

export default function Navbar() {
  const { user, login } = useAuth();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          <Image src="logos/lyra-logo-white.svg" alt="Lyra Logo" 
          width={100} height={20} className="-translate-x-3"/>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-widest hover:text-accent transition-colors border border-white/20 px-3 py-1 rounded-full hover:border-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
            <div className="flex items-center gap-3 border border-white/20 pl-1 pr-4 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 relative">
                    <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none">{user.name}</span>
                    <span className="text-[8px] text-accent uppercase tracking-wider">{user.role}</span>
                </div>
            </div>
        ) : (
             <button 
                onClick={() => login("admin@lyra.com")}
                className="text-xs font-bold tracking-widest bg-white text-black px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              BECOME AN EDITOR
            </button>
        )}
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
