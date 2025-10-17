export const dynamic = 'force-dynamic';

import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';

const privacy = await ApiService.getStaticPage('privacy');

export const metadata = {
  title: 'Privacy',
  description: privacy.description || 'Privacy',
};

export default async function Privacy() {
  return <StaticPage page={privacy} />;
}
