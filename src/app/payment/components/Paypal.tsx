'use client';

import ApiService from '@/service/ApiService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function Paypal({
  order,
  paymentMethod,
}: {
  order: any;
  paymentMethod: any;
}) {
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
        order_id: data.orderID,
      }
    ).then((orderData: any) => {
      const name = orderData.payer.name.given_name;
    });
  };

  return (
    <PayPalScriptProvider
      options={{ clientId: paymentMethod.options?.clientId }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}
