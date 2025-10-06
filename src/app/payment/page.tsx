'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/layouts/Loading';

export default function Payment() {
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loading />;
  }

  if (!user.token) {
    router.push('/user/login?returnTo=/payment');
    return;
  }

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      <h1 className='text-2xl font-bold'>Payment</h1>
    </div>
  );
}
