'use client';
import { useEffect, useState } from 'react';

import ProductBlock from '@/app/components/ProductBlock';
import ApiService from '@/service/ApiService';
import { useSelector } from 'react-redux';
import { SearchProductType } from '../interface';

export default function SearchProductsResult({
  params,
}: {
  params: SearchProductType | null;
}) {
  // get warehouse
  const warehouse = useSelector((state: any) => state.warehouse?.warehouse);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!warehouse?.id) return;

    ApiService.request('GET', '/sale-products', {
      ...params,
      warehouseId: warehouse?.id,
    })
      .then((res: any) => {
        setProducts(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params, warehouse]);

  return (
    <>
      <div className='grid grid-cols-6 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
        {products?.map((product: any) => (
          <ProductBlock key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
