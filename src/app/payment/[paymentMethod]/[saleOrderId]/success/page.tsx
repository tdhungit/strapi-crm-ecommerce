'use client';

import MyOrderDetail from '@/app/user/components/MyOrderDetail';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ApiService from '@/service/ApiService';
import React, { useEffect } from 'react';

interface Props {
  params: Promise<{ paymentMethod: string; saleOrderId: string }>;
}

export default function PaymentSuccess({ params }: Props) {
  const { saleOrderId } = React.use(params);

  const [order, setOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const updateOrder = () => {
    ApiService.requestWithAuth(
      'POST',
      '/customers/payment-method/stripe/payment-success',
      {
        saleOrderId: saleOrderId,
      }
    )
      .then((orderData: any) => {
        setOrder(orderData);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!saleOrderId) return;
    setLoading(true);
    updateOrder();
  }, [saleOrderId]);

  return (
    <div className='bg-white/50 rounded-xl py-5 px-6 overflow-hidden'>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>{error}</div>}
      {!loading && order && (
        <div className='space-y-4'>
          <Alert>
            <AlertTitle>Payment Success</AlertTitle>
            <AlertDescription>
              Your payment has been successfully processed.
            </AlertDescription>
          </Alert>
          <h1 className='text-3xl font-bold'>Order #{order.name}</h1>
          <MyOrderDetail order={order} />
        </div>
      )}
    </div>
  );
}
