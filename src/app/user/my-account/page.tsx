'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ChangePassword from '../components/ChangePassword';
import MyAccount from '../components/MyAccount';
import MyOrders from '../components/MyOrders';

function MyAccountComponent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'my-account';

  return (
    <div className='bg-white/50 rounded-xl py-5 px-6 overflow-hidden'>
      <Tabs defaultValue={activeTab || 'my-account'}>
        <TabsList>
          <TabsTrigger value='my-account'>My Account</TabsTrigger>
          <TabsTrigger value='my-orders'>My Orders</TabsTrigger>
          <TabsTrigger value='change-password'>Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value='my-account'>
          <MyAccount />
        </TabsContent>
        <TabsContent value='my-orders'>
          <MyOrders />
        </TabsContent>
        <TabsContent value='change-password'>
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function MyAccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyAccountComponent />
    </Suspense>
  );
}
