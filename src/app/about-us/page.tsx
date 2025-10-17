export const dynamic = 'force-dynamic';

import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';

const aboutUs = await ApiService.getStaticPage('about-us');

export const metadata = {
  title: 'About Us',
  description: aboutUs.description || 'About Us',
};

export default async function AboutUs() {
  return <StaticPage page={aboutUs} />;
}
