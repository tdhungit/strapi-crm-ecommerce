'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import ApiService from '@/service/ApiService';
import { DialogTitle } from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductDescription from '../product/components/ProductDescription';
import ProductVariants from '../product/components/ProductVariants';
import ProductImages from './ProductImages';

export default function ProductSummaryModal({
  open,
  onOpenChange,
  product: basicProduct,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}) {
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (basicProduct?.id) {
      const date = dayjs().format('YYYY-MM-DD');
      ApiService.request('GET', `/sale-products/${basicProduct.id}`, {
        date,
      }).then((product) => {
        setProduct(product);
      });
    }
  }, [basicProduct]);

  useEffect(() => {
    if (product?.product_variants?.[0]) {
      setSelectedVariant(product.product_variants[0]);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant?.product_prices[0]?.price || 0;
  const originalPrice = selectedVariant?.original_price;
  const discount =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const getProductSlug = () => {
    if (!product.slug) return product.name.toLowerCase().replace(/\s/g, '-');
    return product.slug;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='!max-w-2/3 p-2 pr-0'>
        <DialogHeader style={{ display: 'none' }}>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className='flex flex-col h-[800px] overflow-y-scroll'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 h-full'>
            {/* Left Side - Images */}
            <div className='relative bg-gray-50 p-6 h-full'>
              {/* Product Badges */}
              <div className='absolute top-4 left-4 z-10 flex space-x-2'>
                {product.is_featured && (
                  <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
                    Featured
                  </span>
                )}
                {product.sale_price && (
                  <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
                    Sale
                  </span>
                )}
              </div>

              <div className='rounded-xl overflow-hidden shadow-md'>
                <ProductImages product={product} width='100%' height='300px' />
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className='flex flex-col h-full'>
              <div className='p-6 space-y-4 flex-1'>
                {/* Product Header */}
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    {/* Category Badge */}
                    {product.category && (
                      <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full'>
                        {product.category.name}
                      </span>
                    )}

                    {/* Stock Status */}
                    <div className='flex items-center space-x-1'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.stock_quantity > 0
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          product.stock_quantity > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {product.stock_quantity > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <h2 className='text-xl font-bold text-gray-900 leading-tight'>
                    {product.name}
                  </h2>

                  {/* Rating */}
                  {product.rating && (
                    <div className='flex items-center space-x-2'>
                      <div className='flex text-yellow-400'>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
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
                      <span className='text-sm text-gray-600'>
                        ({product.rating})
                      </span>
                    </div>
                  )}

                  {/* Product Variants */}
                  <div className='bg-gray-50 px-4 py-2 rounded-xl'>
                    <ProductVariants product={product} />
                  </div>

                  {/* View Full Details Link */}
                  <div className='pt-3 border-t border-gray-200'>
                    <Link
                      href={`/product/${getProductSlug()}/${product.id}`}
                      className='w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm'
                      onClick={() => onOpenChange(false)}
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
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                      <span className='font-medium text-gray-700'>
                        View Full Details
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Description Section */}
          <div className='prose prose-sm max-w-none'>
            <ProductDescription product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
