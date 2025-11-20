import Link from "next/link";
import { Menu } from "lucide-react";

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
