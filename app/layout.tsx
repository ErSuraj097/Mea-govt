import './globals.css';
import type { Metadata } from 'next';
import GIGWHeaderBar from '@/components/layout/GIGWHeaderBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'MEA Indian & Global Language Propagation Portal — Government of India',
  description: 'Official Ministry of External Affairs (MEA) portal for Indian & Global Language Learning, adhering strictly to GIGW 3.0, W3C WCAG 2.1 Level AA, Sambhasini AI Speech Mission, and CERT-In Cyber Security Guidelines.',
  keywords: [
    'Ministry of External Affairs',
    'MEA Language Portal',
    'Learn Hindi',
    '22 Scheduled Languages',
    'Devanagari',
    'Sambhasini AI',
    'GIGW 3.0',
    'ICCR Hindi Fellowship',
    'Diplomatic Language Training',
    'CEFR Language Certification'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F5F5F5] text-[#212121] min-h-screen flex flex-col antialiased">
        {/* Top GIGW 3.0 & Accessibility Toolbar */}
        <GIGWHeaderBar />

        {/* Official Sovereign Navbar with Emblem */}
        <Navbar />

        {/* Main Application Container */}
        <main className="flex-1">
          {children}
        </main>

        {/* Official Government Footer */}
        <Footer />
      </body>
    </html>
  );
}
