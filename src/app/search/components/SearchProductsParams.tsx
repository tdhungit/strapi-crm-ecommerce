'use client';

import { SearchProductType } from '../interface';

export default function SearchProductsParams({
  initParams,
}: {
  initParams: SearchProductType | null;
}) {
  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Filters</h3>
    </div>
  );
}
