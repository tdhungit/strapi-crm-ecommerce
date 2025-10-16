'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductDescription from '../product/components/ProductDescription';
import AddToCartButton from './AddToCartButton';
import ProductImages from './ProductImages';

export default function ProductSummaryModal({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

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
      <DialogContent className='!max-w-2/3 h-[85vh] p-0'>
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

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className='flex space-x-2 mt-4 justify-center'>
                {product.images.slice(0, 4).map((image: any, index: number) => (
                  <div
                    key={index}
                    className='w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer'
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className='flex flex-col h-full'>
            <div className='p-6 space-y-4 overflow-y-auto flex-1'>
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
                        product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
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
              </div>

              {/* Price Section */}
              <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                <div className='space-y-2'>
                  <h3 className='text-sm font-semibold text-gray-900'>Price</h3>
                  <div className='flex items-baseline space-x-2'>
                    <span className='text-2xl font-bold text-gray-900'>
                      {formatCurrency(currentPrice)}
                    </span>
                    {originalPrice && originalPrice > currentPrice && (
                      <>
                        <span className='text-lg text-gray-500 line-through'>
                          {formatCurrency(originalPrice)}
                        </span>
                        <span className='bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full'>
                          Save {discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Variants Selection */}
                {product.product_variants &&
                  product.product_variants.length > 0 && (
                    <div className='space-y-2'>
                      <h4 className='text-sm font-semibold text-gray-900'>
                        Options
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {product.product_variants.map((variant: any) => (
                          <button
                            key={variant.id}
                            className={`py-1 px-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 text-xs ${
                              selectedVariant?.id === variant.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedVariant(variant)}
                          >
                            {variant.product_variant_attributes.map(
                              (attribute: any) => (
                                <span key={attribute.id}>
                                  {attribute.product_attribute.name}:{' '}
                                  {attribute.attribute_value}
                                </span>
                              )
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Quantity Selector */}
                <div className='space-y-2'>
                  <h4 className='text-sm font-semibold text-gray-900'>
                    Quantity
                  </h4>
                  <div className='flex items-center space-x-3'>
                    <div className='flex items-center border border-gray-300 rounded-lg'>
                      <button
                        type='button'
                        className='p-1 hover:bg-gray-100 transition-colors rounded-l-lg'
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
                      <span className='px-3 py-1 text-center min-w-[50px] font-medium text-sm'>
                        {quantity}
                      </span>
                      <button
                        type='button'
                        className='p-1 hover:bg-gray-100 transition-colors rounded-r-lg'
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
                    <span className='text-xs text-gray-600'>
                      Total:{' '}
                      <span className='font-semibold text-gray-900'>
                        {formatCurrency(currentPrice * quantity)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                {selectedVariant && (
                  <div className='space-y-2'>
                    <AddToCartButton variant={selectedVariant} />

                    <button className='w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm'>
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
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        />
                      </svg>
                      <span className='font-medium text-gray-700'>
                        Add to Wishlist
                      </span>
                    </button>
                  </div>
                )}
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

              {/* Trust Indicators */}
              <div className='grid grid-cols-2 gap-3 pt-3 border-t border-gray-200'>
                <div className='flex items-center space-x-2 text-xs text-gray-600'>
                  <svg
                    className='w-3 h-3'
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
                  <span>Free Shipping</span>
                </div>

                <div className='flex items-center space-x-2 text-xs text-gray-600'>
                  <svg
                    className='w-3 h-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>30-day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Product Description Section */}
        <div className='mt-6 p-6 border-t border-gray-200 h-3/4 overflow-y-auto'>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Product Details
          </h3>
          <div className='prose prose-sm max-w-none'>
            <ProductDescription product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
