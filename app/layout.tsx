import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import PortfolioShell from "@/components/PortfolioShell";
import MusicProvider from "@/components/MusicProvider";
import "./globals.css";

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Yuhan Su",
  description: "Yuhan Su's world of code, research, music and everyday curiosity.",
  metadataBase: new URL("https://yhansu.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body><MusicProvider><PortfolioShell>{children}</PortfolioShell></MusicProvider></body></html>;
}
