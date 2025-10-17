import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const privacy = await ApiService.getStaticPage('privacy');
  return {
    title: privacy.title || 'Privacy',
    description: privacy.description || 'Privacy',
  };
}

export default async function Privacy() {
  const privacy = await ApiService.getStaticPage('privacy');
  return <StaticPage page={privacy} />;
}
