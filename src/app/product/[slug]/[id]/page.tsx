import ProductImages from '@/app/components/ProductImages';
import ProductDescription from '@/app/product/components/ProductDescription';
import ApiService from '@/service/ApiService';
import dayjs from 'dayjs';
import ProductVariants from '../../components/ProductVariants';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, id } = await params;

  const date = dayjs().format('YYYY-MM-DD');
  const product = await ApiService.request('GET', `/sale-products/${id}`, {
    date,
  });

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      <h1 className='text-2xl font-bold mb-5'>{product.name}</h1>

      <div className='flex gap-2'>
        <div className='flex-1'>
          <ProductImages product={product} width='100%' height='450px' />

          <ProductDescription product={product} />
        </div>
        <div className='w-[450px]'>
          <ProductVariants product={product} />
        </div>
      </div>
    </div>
  );
}
