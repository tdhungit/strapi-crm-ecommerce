import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';

const terms = await ApiService.getStaticPage('terms');

export const metadata = {
  title: 'Terms',
  description: terms.description || 'Terms',
};

export default async function Terms() {
  return <StaticPage page={terms} />;
}
