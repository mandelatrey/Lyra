import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "STUDIOS", href: "#" },
  { name: "ARTICLES", href: "#" },
  { name: "PROJECTS", href: "#" },
  { name: "PHILOSOPHY", href: "#" },
  { name: "COLLAB", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          <Image src="logos/lyra-logo-white.svg" alt="Lyra Logo" 
          width={90} height={20} className="-translate-x-3"/>
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
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
