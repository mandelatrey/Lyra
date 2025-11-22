'use client';

import { Fragment } from "react";

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
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-center universal-padding py-7 mix-blend-difference text-white">
      <div className="w-full h-full">
        <div className="flex flex-row justify-between items-center gap-12 px-3">
          <div className="flex items-center gap-4 w-full">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <Image src="logos/lyra-logo-white.svg" alt="Lyra Logo" 
              width={100} height={20} className="-translate-x-2"/>
            </Link>
          </div>
          <div className="hidden md:flex items-center w-full justify-center">
              {navLinks.map((link, index) => (
                <Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium tracking-wider hover:text-accent transition-colors px-6 font-mono"
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-[10px] text-lime-200/50">|</span>
                  )}
                </Fragment>
              ))}
          </div>
          <div className="flex items-center gap-4 justify-end w-full">
            {user ? (
                <div className="flex items-center gap-3 border border-white/20 w-[150px] px-2 py-2 rounded-full bg-lime-300/20 backdrop-blur-sm transition-colors hover:bg-orange-500/10">
                  <Link href={`/user/${user.id}`} className="relative w-10 h-10 border border-white/20 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                      {user.avatar ? (
                          <Image
                              src={user.avatar}
                              alt={user.name}
                              fill
                              className="object-cover"
                          />
                      ) : (
                          <span className="text-gray-500 text-xs">{user.name.charAt(0)}</span>
                      )}
                  </Link>
                  <div className="flex flex-col justify-start flex-grow min-w-0">
                      <span className="text-[10px] font-bold leading-none truncate">{user.name}</span>
                      <span className="text-[8px] text-accent uppercase tracking-wider truncate">{user.role}</span>
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
        </div>
      </div>
    </nav>
  );
}
