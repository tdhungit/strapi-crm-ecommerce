import CategoryProductsBlock from '@/app/components/CategoryProductsBlock';
import ApiService from '@/service/ApiService';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
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
