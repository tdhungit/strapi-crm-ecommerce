'use client';

import { useEffect, useState } from 'react';
import { SearchProductType } from '../interface';
import SearchProductsParams from './SearchProductsParams';
import SearchProductsResult from './SearchProductsResult';

export default function SearchProducts({
  searchParams,
}: {
  searchParams: {
    [key: string]: any;
  };
}) {
  const [params, setParams] = useState<SearchProductType | null>(null);

  const updateParams = (newParams: SearchProductType) => {
    newParams.keyword = searchParams.keyword;
    setParams(newParams);
  };

  useEffect(() => {
    if (!searchParams.keyword) return;

    const newParams: SearchProductType = {};
    if (searchParams.keyword) {
      newParams.keyword = searchParams.keyword;
    }
    setParams(newParams);
  }, [searchParams]);

  return (
    <div className='flex'>
      <div className='w-[260px]'>
        <SearchProductsParams onChange={updateParams} />
      </div>
      <div className='ml-4'>
        <SearchProductsResult params={params} />
      </div>
    </div>
  );
}
