export const dynamic = 'force-dynamic';

import CategoryProductsBlock from '@/app/components/CategoryProductsBlock';
import ApiService from '@/service/ApiService';
import { ResolvingMetadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
) {
  const { slug, id } = await params;

  const category = await ApiService.request('GET', `/sale-categories/${id}`);

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug, id } = await params;

  const category = await ApiService.request('GET', `/sale-categories/${id}`);

  return (
    <>
      <CategoryProductsBlock category={category} />
    </>
  );
}
