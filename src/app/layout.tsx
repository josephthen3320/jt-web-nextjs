import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from './components/header';
import Footer from './components/footer';
import { headerNavLinks } from '@/configs/header-nav-links';
import { themeInitScript } from '@/lib/theme';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  // suppressHydrationWarning: the init script adds the `dark` class to <html>
  // before React hydrates, so the DOM intentionally differs.
  return (
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
          {/* Must stay the first node in the body: applies the stored or
              system palette before any content is painted. */}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
