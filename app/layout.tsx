import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fecto Cement Limited — Building Pakistan's Future",
  description: "Official corporate web portal of Fecto Cement Limited. High-performance Ordinary Portland (OPC Grade 53) and Sulphate Resistant (SRC) cement manufactured at Sangjani Plant, Islamabad.",
  icons: {
    icon: '/fecto-logo.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#000080',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="text-slate-900 bg-[#F1F5F9] antialiased min-h-screen selection:bg-[#F4D5AB] selection:text-[#000080]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

