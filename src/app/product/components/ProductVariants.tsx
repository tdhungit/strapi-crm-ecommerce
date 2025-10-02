'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Props {
  product: any;
}

export default function ProductVariants({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    setSelectedVariant(product.product_variants[0]);
  }, [product]);

  return (
    <div className='bg-white p-4 rounded-xl'>
      <h2 className='font-bold text-xl mb-2'>Price</h2>
      <p className='text-2xl font-bold text-red-500'>
        ${selectedVariant?.product_prices[0].price}
      </p>
      <div className='flex gap-2'>
        {product.product_variants.map((variant: any) => (
          <button
            type='button'
            key={variant.id}
            className={`mt-2 flex gap-4 py-1 px-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 ${
              selectedVariant?.id === variant.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => setSelectedVariant(variant)}
          >
            {variant.product_variant_attributes.map((attribute: any) => (
              <span key={attribute.id} className='text-xs'>
                {attribute.product_attribute.name}: {attribute.attribute_value}
              </span>
            ))}
          </button>
        ))}
      </div>
      <div className='mt-4 flex flex-col'>
        <Button className='cursor-pointer'>Add to Cart</Button>
      </div>
    </div>
  );
}
