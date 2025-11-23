import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CursorProvider } from "@/context/CursorContext";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Lyra",
  description: "The future of design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased bg-[#0a0a0a] text-white`}
        suppressHydrationWarning
      >
         <Analytics />
        <AuthProvider>
          <CursorProvider>
            <CustomCursor />
            <SmoothScroll />
            {children}
            <Footer />
          </CursorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
