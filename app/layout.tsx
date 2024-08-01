import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { ShoppingCartStoreProvider } from '@/providers/shoppingcartstoreprovider';
import Header from '@/components/layout/header';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
   title: "Ric's Bread & Butter",
   description: 'Bakery e-commerce site',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={cn(
               'min-h-screen bg-background font-sans antialiased',
               fontSans.variable
            )}
         >
            <ShoppingCartStoreProvider>
               <Header />
               {children}
            </ShoppingCartStoreProvider>
         </body>
      </html>
   );
}
