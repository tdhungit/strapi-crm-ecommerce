import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const aboutUs = await ApiService.getStaticPage('about-us');
  return {
    title: aboutUs.title || 'About Us',
    description: aboutUs.description || 'About Us',
  };
}

export default async function AboutUs() {
  const aboutUs = await ApiService.getStaticPage('about-us');
  return <StaticPage page={aboutUs} />;
}
