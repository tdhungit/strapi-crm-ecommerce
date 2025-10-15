'use client';

import AddToCartButton from '@/app/components/AddToCartButton';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  product: any;
}

export default function ProductVariants({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedVariant(product.product_variants[0]);
  }, [product]);

  const currentPrice = selectedVariant?.product_prices[0]?.price || 0;
  const originalPrice = selectedVariant?.original_price;
  const discount =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className='space-y-4'>
      {/* Price Section */}
      <div className='space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>Price</h2>
        <div className='flex items-baseline space-x-2'>
          <span className='text-2xl font-bold text-gray-900'>
            {formatCurrency(currentPrice)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <>
              <span className='text-xl text-gray-500 line-through'>
                {formatCurrency(originalPrice)}
              </span>
              <span className='bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full'>
                Save {discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Variants Selection */}
      {product.product_variants && product.product_variants.length > 0 && (
        <div className='space-y-3'>
          <h3 className='text-base font-semibold text-gray-900'>Options</h3>
          <div className='flex flex-wrap gap-2'>
            {product.product_variants.map((variant: any) => (
              <button
                type='button'
                key={variant.id}
                className={`py-1 px-4 border rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
                  selectedVariant?.id === variant.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                <div className='flex gap-2'>
                  {variant.product_variant_attributes.map((attribute: any) => (
                    <span key={attribute.id} className='text-sm'>
                      {attribute.product_attribute.name}:{' '}
                      {attribute.attribute_value}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className='space-y-3'>
        <h3 className='text-base font-semibold text-gray-900'>Quantity</h3>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center border border-gray-300 rounded-lg'>
            <button
              type='button'
              className='p-2 hover:bg-gray-100 transition-colors rounded-l-lg'
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 12H4'
                />
              </svg>
            </button>
            <span className='px-4 py-2 text-center min-w-[60px] font-medium'>
              {quantity}
            </span>
            <button
              type='button'
              className='p-2 hover:bg-gray-100 transition-colors rounded-r-lg'
              onClick={() => setQuantity(quantity + 1)}
            >
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </button>
          </div>
          <span className='text-sm text-gray-600'>
            Total:{' '}
            <span className='font-semibold text-gray-900'>
              {formatCurrency(currentPrice * quantity)}
            </span>
          </span>
        </div>
      </div>

      {/* Add to Cart Section */}
      <div className='space-y-3 pt-4 border-t border-gray-200'>
        {selectedVariant && (
          <div className='space-y-3'>
            <AddToCartButton variant={selectedVariant} />

            {/* Wishlist Button */}
            <button className='w-full flex items-center justify-center space-x-2 py-1 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors'>
              <svg
                className='w-5 h-5 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <span className='font-medium text-gray-700 text-sm cursor-pointer'>
                Add to Wishlist
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='space-y-2 pt-4 border-t border-gray-200'>
        <div className='flex items-center space-x-3 text-sm text-gray-600'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
            />
          </svg>
          <span>Free shipping on orders over $50</span>
        </div>

        <div className='flex items-center space-x-3 text-sm text-gray-600'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          <span>30-day return policy</span>
        </div>

        <div className='flex items-center space-x-3 text-sm text-gray-600'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
}
