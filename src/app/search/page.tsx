import { Metadata } from 'next';
import SearchProducts from './components/SearchProducts';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    keyword: string;
  };
}): Promise<Metadata> {
  const { keyword } = await searchParams;

  return {
    title: `Search Products for "${keyword}"`,
    description: `Search Products for "${keyword}"`,
  };
}

export default async function SearchProductsPage({
  searchParams,
}: {
  searchParams: {
    keyword: string;
  };
}) {
  const { keyword } = await searchParams;

  return (
    <div>
      <SearchProducts searchParams={{ keyword }} />
    </div>
  );
}
