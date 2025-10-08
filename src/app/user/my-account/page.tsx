'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import MyAccount from '../components/MyAccount';
import MyOrders from '../components/MyOrders';

export default function MyAccountPage() {
  return (
    <div className='bg-white/50 rounded-xl py-5 px-6 overflow-hidden'>
      <Tabs defaultValue='my-account'>
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
