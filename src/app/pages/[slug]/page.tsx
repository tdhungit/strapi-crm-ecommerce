import StaticPage from '@/app/components/StaticPage';
import ApiService from '@/service/ApiService';
import { ResolvingMetadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
) {
  const { slug } = await params;

  const page = await ApiService.getStaticPage(slug);

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await ApiService.getStaticPage(slug);

  return <StaticPage page={page} />;
}
