import { getGlobalSettings } from '@/lib/settings';
import { getMediaUrl } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import ChatBox from './components/layouts/ChatBox';
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

export async function generateMetadata(): Promise<Metadata> {
  let globalSettings;
  try {
    globalSettings = await getGlobalSettings();
  } catch (error) {
    globalSettings = {};
  }

  return {
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let globalSettings;
  try {
    globalSettings = await getGlobalSettings();
  } catch (error) {
    globalSettings = {};
  }

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className='bg-gray-200 min-h-screen grid grid-rows-[auto_1fr_auto]'>
            <Header globalSettings={globalSettings} />
            <main className='container mx-auto m-6 overflow-hidden'>
              {children}
            </main>
            <Footer globalSettings={globalSettings} />
          </div>
          <Toaster position='bottom-center' closeButton />
          <ChatBox />
        </ReduxProvider>
      </body>
    </html>
  );
}
