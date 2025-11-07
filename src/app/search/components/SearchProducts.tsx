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
      <div className='w-[200px]'>
        <SearchProductsParams initParams={params} />
      </div>
      <div>
        <SearchProductsResult params={params} />
      </div>
    </div>
  );
}
