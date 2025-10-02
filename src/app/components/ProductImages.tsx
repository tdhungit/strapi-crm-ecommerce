'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getMediaUrl } from '@/lib/utils';
import Link from 'next/link';

export default function ProductImages({
  product,
  height,
  width,
}: {
  product: any;
  height?: any;
  width?: any;
}) {
  const getProductSlug = () => {
    if (!product.slug) return product.name.toLowerCase().replace(/\s/g, '-');
    return product.slug;
  };

  return (
    <div className='w-full bg-white p-2 border border-gray-200 rounded-xl overflow-hidden'>
      <Carousel
        className='w-full overflow-hidden'
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {product?.photos?.map((photo: { id: number; url: string }) => (
            <CarouselItem
              key={photo.id}
              className='w-full'
              style={{ height: height || 220, width: width || 220 }}
            >
              <Link
                href={`/product/${getProductSlug()}/${product.id}`}
                className='w-full h-full'
              >
                <img
                  src={getMediaUrl(photo)}
                  alt='banner'
                  className='w-full h-full'
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
