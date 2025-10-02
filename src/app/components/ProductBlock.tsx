'use client';

import Link from 'next/link';
import ProductImages from './ProductImages';

export default function ProductBlock({ product }: { product: any }) {
  const getProductSlug = () => {
    if (!product.slug) return product.name.toLowerCase().replace(/\s/g, '-');
    return product.slug;
  };

  return (
    <div className='w-full bg-white p-2 border border-gray-200 rounded-xl overflow-hidden'>
      <ProductImages product={product} />

      <div className='pt-1'>
        <h1 className='font-bold text-xs'>
          <Link href={`/product/${getProductSlug()}/${product.id}`}>
            {product.name}
          </Link>
        </h1>
        <p className='text-xs text-red-500 font-bold pt-1'>
          ${product.from_price} - ${product.to_price}
        </p>
      </div>
    </div>
  );
}
