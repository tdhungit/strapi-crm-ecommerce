'use client';

import ApiService from '@/service/ApiService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductBlock from './ProductBlock';

export default function CategoryProductsBlock({ category }: { category: any }) {
  const [products, setProducts] = useState<any>([]);

  // get warehouse
  const warehouse = useSelector((state: any) => state.warehouse?.warehouse);

  useEffect(() => {
    if (!warehouse) return;

    ApiService.request('GET', '/sale-products', {
      categoryId: category.id,
      warehouseId: warehouse.id,
    }).then((res) => {
      setProducts(res.data);
    });
  }, [category, warehouse]);

  return (
    <div className='bg-white/50 rounded-xl p-4 overflow-hidden mt-6'>
      <h1 className='text-2xl font-bold'>{category.name}</h1>
      <p className='text-gray-600 text-sm'>{category.description}</p>

      <div className='grid grid-cols-6 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
        {products?.map((product: any) => (
          <ProductBlock key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
