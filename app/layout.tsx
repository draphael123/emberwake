import type { Metadata } from "next";
import { Cinzel, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const display = Cinzel({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Emberwake — Action Platformer Prototype",
  description: "A playable fantasy action-platformer prototype built from the Emberwake sprite library.",
  openGraph: { title: "Emberwake", description: "Enter the Mossbound Road.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body></html>;
}
