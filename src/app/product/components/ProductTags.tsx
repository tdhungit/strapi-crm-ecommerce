'use client';

import ApiService from '@/service/ApiService';
import { useEffect, useState } from 'react';

interface Props {
  product: any;
}

interface TagType {
  id: number;
  name: string;
}

export default function ProductTags({ product }: Props) {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    if (!product) return;

    ApiService.request('GET', `/sale-products/${product.id}/tags`).then(
      (data) => {
        setTags(data);
      }
    );
  }, [product]);

  return (
    <div className='space-x-1 flex flex-wrap'>
      {tags.map((tag) => (
        <div
          key={tag.id}
          className='border border-green-200 bg-green-100 rounded-2xl px-3 py-1 text-sm text-green-700'
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
}
