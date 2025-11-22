import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "SITEMAP",
    links: [
      { name: "DISCOVER", href: "#discover" },
      { name: "CHARTS", href: "#charts" },
      { name: "EDITORS", href: "#editors" },
      { name: "MERCH", href: "#merch" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/10">
      <div className="universal-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* CTA Section */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6 tracking-tighter">
                Welcome to a new <br />
                <span className="bg-gradient-to-tr from-accent to-lime-400 text-transparent bg-clip-text font-mono rotate-3">extraordinary</span> life.
              </h3>
              
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-6 flex flex-row items-center justify-between md:justify-start gap-12 md:gap-24 ">
            {footerLinks.map((column) => (
              <div key={column.title} className="flex flex-col gap-4 w-[70%]">
                <h4 className="text-xs font-mono text-white/50 tracking-widest">
                  {column.title}
                </h4>
                <ul className="flex items-center gap-2 justify-between w-full">
                  {column.links.map((link) => (
                    <li key={link.name} className="">
                      <Link
                        href={link.href}
                        className="font-mono tracking-wider text-xs md:text-sm hover:text-accent transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-end justify-between border-t border-white/10 pt-10">
          <div className="w-full md:w-auto mb-6 md:mb-0">
             <Image src="/logos/lyra-logo-white.svg" alt="Logo" width={300} height={300} className="w-full h-auto bg-blend-overlay opacity-10"/>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end">
            <p className="text-xs text-white/40 font-mono">
              © {new Date().getFullYear()} Lyra Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
                <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
