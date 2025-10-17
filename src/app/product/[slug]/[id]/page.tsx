export const dynamic = 'force-dynamic';

import ProductImages from '@/app/components/ProductImages';
import ProductDescription from '@/app/product/components/ProductDescription';
import ApiService from '@/service/ApiService';
import dayjs from 'dayjs';
import ProductVariants from '../../components/ProductVariants';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const date = dayjs().format('YYYY-MM-DD');
  const product = await ApiService.request('GET', `/sale-products/${id}`, {
    date,
  });

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const date = dayjs().format('YYYY-MM-DD');
  const product = await ApiService.request('GET', `/sale-products/${id}`, {
    date,
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
      {/* Breadcrumb */}
      <div className='container mx-auto px-4 py-4'>
        <nav className='flex items-center space-x-2 text-sm text-gray-600'>
          <a href='/' className='hover:text-gray-900 transition-colors'>
            Home
          </a>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          <a href='/products' className='hover:text-gray-900 transition-colors'>
            Products
          </a>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          <span className='text-gray-900 font-medium'>{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className='container mx-auto px-4 pb-12'>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-0'>
            {/* Left Side - Images */}
            <div className='relative bg-gray-50 p-8 lg:p-12 lg:col-span-2'>
              <div className='sticky top-8'>
                {/* Product Badge */}
                {product.is_featured && (
                  <div className='absolute top-4 left-4 z-10'>
                    <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                      Featured
                    </span>
                  </div>
                )}

                {/* Sale Badge */}
                {product.sale_price && (
                  <div className='absolute top-4 right-4 z-10'>
                    <span className='bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                      Sale
                    </span>
                  </div>
                )}

                <div className='rounded-2xl overflow-hidden shadow-lg'>
                  <ProductImages
                    product={product}
                    width='100%'
                    height='500px'
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className='p-6 lg:p-8 space-y-6 lg:col-span-1'>
              {/* Product Header */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  {/* Category Badge */}
                  {product.category && (
                    <span className='bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full'>
                      {product.category.name}
                    </span>
                  )}

                  {/* Stock Status */}
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.stock_quantity > 0
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        product.stock_quantity > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <h1 className='text-3xl lg:text-2xl font-bold text-gray-900 leading-tight'>
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className='flex items-center space-x-3'>
                    <div className='flex text-yellow-400'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
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
                    <span className='text-gray-600'>
                      ({product.rating}) • {product.reviews_count || 0} reviews
                    </span>
                  </div>
                )}
              </div>

              {/* Product Variants */}
              <div className='bg-gray-50 px-4 py-2 rounded-xl'>
                <ProductVariants product={product} />
              </div>

              {/* Key Features */}
              {product.features && (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Key Features
                  </h3>
                  <ul className='grid grid-cols-1 gap-3'>
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className='flex items-center space-x-3'>
                        <svg
                          className='w-5 h-5 text-green-500 flex-shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span className='text-gray-700'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust Badges */}
              <div className='grid grid-cols-3 gap-4 pt-6 border-t border-gray-200'>
                <div className='text-center space-y-2'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto'>
                    <svg
                      className='w-6 h-6 text-blue-600'
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
                  </div>
                  <div className='text-xs text-gray-600'>
                    <div className='font-medium'>Free Shipping</div>
                    <div>On orders over $50</div>
                  </div>
                </div>

                <div className='text-center space-y-2'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
                    <svg
                      className='w-6 h-6 text-green-600'
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
                  </div>
                  <div className='text-xs text-gray-600'>
                    <div className='font-medium'>Quality Guarantee</div>
                    <div>30-day return policy</div>
                  </div>
                </div>

                <div className='text-center space-y-2'>
                  <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto'>
                    <svg
                      className='w-6 h-6 text-purple-600'
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
                  </div>
                  <div className='text-xs text-gray-600'>
                    <div className='font-medium'>Secure Payment</div>
                    <div>SSL encrypted checkout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className='mt-12 bg-white rounded-3xl shadow-xl p-8 lg:p-12'>
          <div className='mx-auto'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Product Details
            </h2>
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
