'use client';

import Loading from '@/app/components/layouts/Loading';
import MyOrderDetail from '@/app/user/components/MyOrderDetail';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ApiService from '@/service/ApiService';
import { AlertCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Paypal from '../../components/Paypal';

interface Props {
  params: Promise<{ paymentMethod: string; saleOrderId: string }>;
}

export default function PaymentMethod({ params }: Props) {
  const { paymentMethod: paymentMethodName, saleOrderId } = React.use(params);
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [paymentMethodLoading, setPaymentMethodLoading] =
    useState<boolean>(true);

  useEffect(() => {
    if (!saleOrderId || !paymentMethodName) return;

    setOrderLoading(true);
    setPaymentMethodLoading(true);

    ApiService.requestWithAuth(
      'GET',
      `/customers/contact/orders/${saleOrderId}`
    )
      .then((res) => {
        setOrder(res);
      })
      .finally(() => setOrderLoading(false));

    ApiService.request('GET', `/payment-methods/${paymentMethodName}/details`)
      .then((res) => {
        setPaymentMethod(res);
      })
      .finally(() => setPaymentMethodLoading(false));
  }, [saleOrderId, paymentMethodName]);

  if (orderLoading || paymentMethodLoading) return <Loading />;

  if (!order) {
    return (
      <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
        <div className='text-red-500 flex justify-center items-center'>
          Order not found
        </div>
      </div>
    );
  }

  if (!paymentMethod) {
    return (
      <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
        <div className='text-red-500 flex justify-center items-center'>
          Payment method not found
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white/50 rounded-xl py-5 px-6 overflow-hidden'>
      {paymentMethod.name === 'COD' && (
        <div>
          <h2 className='text-xl font-bold mb-2'>Cash on Delivery</h2>
          <Alert variant='destructive'>
            <AlertCircleIcon />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please pay the amount to the store owner.
            </AlertDescription>
          </Alert>
          <div className='mt-4'>
            <MyOrderDetail order={order} />
          </div>
          <div className='mt-4 flex justify-end'>
            <Button
              onClick={() => router.push('/user/my-account?tab=my-orders')}
            >
              My Orders
            </Button>
          </div>
        </div>
      )}

      {paymentMethod.name === 'paypal' && (
        <div>
          <h2 className='text-xl font-bold'>Processing...</h2>
          <Paypal order={order} paymentMethod={paymentMethod} />
        </div>
      )}
    </div>
  );
}
