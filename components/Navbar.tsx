'use client';

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  {name: "HOME", href: "#home"},
  { name: "DISCOVER", href: "#discover" },
  { name: "CHARTS", href: "#charts" },
  { name: "EDITORS", href: "#editors" },
  { name: "MERCH", href: "#merch" },
];

export default function Navbar() {
  const { user, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
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
                  <Link href={`/user/${user.id}`} className="relative w-10 h-10 border border-white/20 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
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
                  <div className="flex flex-col justify-start grow min-w-0">
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
            <button 
              className="md:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center md:hidden"
        >
           <div className="flex flex-col w-full px-6">
              {navLinks.map((link, index) => (
                <Fragment key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-mono font-light text-center py-8 text-white hover:text-accent transition-colors tracking-widest"
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="w-full h-[1px] bg-white/10" />
                  )}
                </Fragment>
              ))}
           </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
