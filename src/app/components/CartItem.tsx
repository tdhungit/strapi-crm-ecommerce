'use client';

import { formatCurrency, getMediaUrl } from '@/lib/utils';

interface ProductAttribute {
  id: number;
  name: string;
}

interface ProductVariantAttribute {
  id: number;
  attribute_value: string;
  product_attribute: ProductAttribute;
}

interface ProductPrice {
  price: number;
  before_price?: number;
}

interface ProductImage {
  url: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
    small?: {
      url: string;
    };
  };
}

interface CartItemProps {
  id: number;
  name: string;
  sku: string;
  photos: ProductImage[];
  product_variant_attributes: ProductVariantAttribute[];
  price: number;
  cartQty: number;
  onQuantityChange: (id: number, newQty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  id,
  name,
  sku,
  photos,
  product_variant_attributes,
  price,
  cartQty,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className='flex flex-col md:flex-row gap-4 py-4 border-b border-gray-200'>
      <div className='w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden'>
        <img
          src={getMediaUrl(photos?.[0])}
          alt={name}
          width={96}
          height={96}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex-1'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='font-medium text-gray-900'>{name}</h3>
            <p className='text-sm text-gray-500'>SKU: {sku}</p>

            {product_variant_attributes?.length > 0 && (
              <div className='mt-1 space-y-1'>
                {product_variant_attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className='flex items-center text-sm text-gray-600'
                  >
                    <span className='font-medium'>
                      {attr.product_attribute.name}:
                    </span>
                    <span className='ml-1'>{attr.attribute_value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onRemove(id)}
            className='text-gray-400 hover:text-red-500 transition-colors'
            aria-label='Remove item'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </div>

        <div className='mt-4 flex items-center justify-between'>
          <div className='flex items-center border border-gray-300 rounded-md'>
            <button
              onClick={() => onQuantityChange(id, Math.max(1, cartQty - 1))}
              className='px-3 py-1 text-gray-600 hover:bg-gray-100'
              aria-label='Decrease quantity'
            >
              -
            </button>
            <span className='px-4 py-1 w-12 text-center'>{cartQty}</span>
            <button
              onClick={() => onQuantityChange(id, cartQty + 1)}
              className='px-3 py-1 text-gray-600 hover:bg-gray-100'
              aria-label='Increase quantity'
            >
              +
            </button>
          </div>

          <div className='text-right'>
            <p className='font-medium text-gray-900'>
              {formatCurrency(price * cartQty)}
            </p>
            {cartQty > 1 && (
              <p className='text-sm text-gray-500'>
                {formatCurrency(price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
