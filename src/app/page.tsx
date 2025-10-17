'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getMediaUrl } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import { useEffect, useState } from 'react';
import CategoryProductsBlock from './components/CategoryProductsBlock';

export default function Home() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    ApiService.request('GET', '/home-page', {
      populate: '*',
    })
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setData({});
      });
  }, []);

  return (
    <>
      <Carousel
        className='w-full rounded-xl overflow-hidden'
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {data.main_banners?.map(
            (banner: {
              id: number;
              href: string;
              banner_url?: string;
              banner?: {
                url: string;
                [key: string]: any;
              };
            }) => (
              <CarouselItem key={banner.id} className='w-full h-[250px]'>
                <a href={banner.href} className='w-full h-full'>
                  <img
                    src={banner.banner_url || getMediaUrl(banner.banner)}
                    alt='banner'
                    className='w-full h-full'
                  />
                </a>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className='left-[10px]' />
        <CarouselNext className='right-[10px]' />
      </Carousel>

      {data.product_categories?.map((category: any) => (
        <CategoryProductsBlock key={category.id} category={category} />
      ))}
    </>
  );
}
