import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { Header } from './components/header';
import Footer from './components/footer';
import { headerNavLinks } from '@/configs/header-nav-links';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Thenara",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className='dark scroll-smooth'>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.className} bg-white text-black antialiased dark:bg-background-color dark:text-white`}>
          <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
              <div className="flex h-screen flex-col justify-between">
                  <Header navLinks={headerNavLinks} />
                  <main className="mb-auto">{children}</main>
                  <Footer />
              </div>
          </div>
      </body>
      </html>
  );
}
