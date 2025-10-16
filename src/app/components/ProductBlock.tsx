'use client';

import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import ProductImages from './ProductImages';
import ProductSummaryModal from './ProductSummaryModal';

export default function ProductBlock({ product }: { product: any }) {
  const [openProductSummary, setOpenProductSummary] = useState(false);

  const getProductSlug = () => {
    if (!product.slug) return product.name.toLowerCase().replace(/\s/g, '-');
    return product.slug;
  };

  return (
    <div className='group w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
      {/* Image Container */}
      <div className='relative overflow-hidden rounded-t-2xl'>
        <ProductImages product={product} />

        {/* Quick view button */}
        <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button
            className='bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200'
            onClick={(e) => {
              e.preventDefault();
              setOpenProductSummary(true);
            }}
          >
            <svg
              className='w-4 h-4 text-gray-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </button>
        </div>

        {/* Sale badge */}
        {product.sale_price && (
          <div className='absolute top-3 left-3'>
            <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md'>
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-4 space-y-3'>
        {/* Product Name */}
        <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-relaxed'>
          <Link
            href={`/product/${getProductSlug()}/${product.id}`}
            className='group-hover:text-blue-600 transition-colors duration-200'
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating (if available) */}
        {product.rating && (
          <div className='flex items-center space-x-1'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
            </div>
            <span className='text-xs text-gray-500'>({product.rating})</span>
          </div>
        )}

        {/* Price Section */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            {product.from_price === product.to_price ? (
              <div className='flex items-center space-x-2'>
                <span className='text-lg font-bold text-gray-900'>
                  {formatCurrency(product.from_price)}
                </span>
                {product.original_price &&
                  product.original_price > product.from_price && (
                    <span className='text-sm text-gray-500 line-through'>
                      {formatCurrency(product.original_price)}
                    </span>
                  )}
              </div>
            ) : (
              <span className='text-lg font-bold text-gray-900'>
                {formatCurrency(product.from_price)} -{' '}
                {formatCurrency(product.to_price)}
              </span>
            )}

            {/* Discount percentage */}
            {product.original_price &&
              product.original_price > product.from_price && (
                <div className='text-xs text-green-600 font-medium'>
                  Save{' '}
                  {Math.round(
                    ((product.original_price - product.from_price) /
                      product.original_price) *
                      100
                  )}
                  %
                </div>
              )}
          </div>

          {/* Add to cart button */}
          <Link
            className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0'
            href={`/product/${product.slug}/${product.id}`}
          >
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
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          </Link>
        </div>

        {/* Stock status */}
        {product.stock !== undefined && (
          <div className='flex items-center space-x-2'>
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span
              className={`text-xs ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        )}
      </div>

      <ProductSummaryModal
        product={product}
        open={openProductSummary}
        onOpenChange={setOpenProductSummary}
      />
    </div>
  );
}
