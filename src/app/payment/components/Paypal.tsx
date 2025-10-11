'use client';

import { formatCurrency } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function Paypal({
  order,
  paymentMethod,
  onSuccess,
}: {
  order: any;
  paymentMethod: any;
  onSuccess?: (orderData: any) => void;
}) {
  const getClientId = () => {
    if (paymentMethod.options?.sandbox) {
      return paymentMethod.options?.sandboxClientId || '';
    }
    return paymentMethod.options?.clientId || '';
  };

  const createOrder = () => {
    return ApiService.requestWithAuth(
      'POST',
      '/customers/payment-method/paypal/create-order',
      {
        saleOrderId: order.id,
      }
    ).then((res) => res.id);
  };

  const onApprove = (data: any) => {
    return ApiService.requestWithAuth(
      'POST',
      '/customers/payment-method/paypal/approve-order',
      {
        saleOrderId: order.id,
      }
    ).then((orderData: any) => {
      onSuccess?.(orderData);
    });
  };

  return (
    <PayPalScriptProvider options={{ clientId: getClientId() }}>
      <div className='space-y-4 flex flex-col'>
        <div className='text-2xl font-bold'>
          Total: {formatCurrency(order.total_amount)}
        </div>

        <div>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
