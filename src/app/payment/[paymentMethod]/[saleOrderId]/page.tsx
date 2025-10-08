'use client';

import Loading from '@/app/components/layouts/Loading';
import ApiService from '@/service/ApiService';
import React, { useEffect, useState } from 'react';
import Paypal from '../../components/Paypal';

interface Props {
  params: Promise<{ paymentMethod: string; saleOrderId: string }>;
}

export default function PaymentMethod({ params }: Props) {
  const { paymentMethod: paymentMethodName, saleOrderId } = React.use(params);

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
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
      {paymentMethod.name === 'COD' && (
        <div>
          <h2 className='text-xl font-bold'>Cash on Delivery</h2>
          <p className='text-gray-500'>
            Please pay the amount to the store owner.
          </p>
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
