'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useSearchParams } from 'next/navigation';
import MyAccount from '../components/MyAccount';
import MyOrders from '../components/MyOrders';

export default function MyAccountPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab');

  return (
    <div className='bg-white/50 rounded-xl py-5 px-6 overflow-hidden'>
      <Tabs defaultValue={activeTab || 'my-account'}>
        <TabsList>
          <TabsTrigger value='my-account'>My Account</TabsTrigger>
          <TabsTrigger value='my-orders'>My Orders</TabsTrigger>
        </TabsList>
        <TabsContent value='my-account'>
          <MyAccount />
        </TabsContent>
        <TabsContent value='my-orders'>
          <MyOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
}
