import { getGlobalSettings } from '@/lib/settings';
import { getMediaUrl } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import './globals.css';
import ReduxProvider from './stores/ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const globalSettings = await getGlobalSettings();

export const metadata: Metadata = {
  title: {
    template: '%s | ' + (globalSettings.title || 'Strapi CRM & E-Commerce'),
    default: globalSettings.title || 'Strapi CRM & E-Commerce',
  },
  description:
    globalSettings.description ||
    globalSettings.slogan ||
    'Strapi CRM & E-Commerce',
  icons: {
    icon: globalSettings.favicon
      ? getMediaUrl(globalSettings.favicon)
      : '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await ApiService.request('GET', '/product-categories');

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className='bg-gray-200 min-h-screen grid grid-rows-[auto_1fr_auto]'>
            <Header globalSettings={globalSettings} categories={categories} />
            <main className='container mx-auto m-6 overflow-hidden'>
              {children}
            </main>
            <Footer globalSettings={globalSettings} />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
