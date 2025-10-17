import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const terms = await ApiService.getStaticPage('terms');
  return {
    title: terms.title || 'Terms',
    description: terms.description || 'Terms',
  };
}

export default async function Terms() {
  const terms = await ApiService.getStaticPage('terms');
  return <StaticPage page={terms} />;
}
