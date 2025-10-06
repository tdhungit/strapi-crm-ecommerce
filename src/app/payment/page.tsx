'use client';

import { useEffect, useState } from 'react';
import Loading from '../components/layouts/Loading';

export default function Payment() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      <h1 className='text-2xl font-bold'>Payment</h1>
    </div>
  );
}
