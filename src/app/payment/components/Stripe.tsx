'use client';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo, useState } from 'react';

const CheckoutForm = ({
  order,
  onSuccess,
}: {
  order: any;
  onSuccess?: (orderData: any) => void;
}) => {
  const checkoutState = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (checkoutState.type === 'loading') {
      setLoading(true);
      return;
    }

    if (checkoutState.type === 'error') {
      setError(checkoutState.error.message);
      setLoading(false);
      return;
    }

    // checkoutState.type === 'success'
    const { checkout } = checkoutState;
    const result = await checkout.confirm();

    if (result.type === 'error') {
      setError(result.error.message);
      setLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
      <PaymentElement />

      {error && (
        <div className='flex justify-center items-center text-red-500'>
          {error}
        </div>
      )}

      <div>
        <Button type='submit' className='w-full' disabled={loading}>
          Pay {formatCurrency(order.total_amount)} {loading ? '...' : ''}
        </Button>
      </div>
    </form>
  );
};

export default function Stripe({
  order,
  paymentMethod,
  onSuccess,
}: {
  order: any;
  paymentMethod: any;
  onSuccess?: (orderData: any) => void;
}) {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    if (paymentMethod?.options) {
      const publicKey = paymentMethod.options.testMode
        ? paymentMethod.options.testApiKey
        : paymentMethod.options.apiKey;

      const stripePromiseObj = loadStripe(publicKey);
      setStripePromise(stripePromiseObj);
    }
  }, [paymentMethod]);

  useMemo(() => {
    if (order) {
      ApiService.requestWithAuth(
        'POST',
        '/customers/payment-method/stripe/create-checkout-session',
        {
          saleOrderId: order.id,
          returnUrl:
            process.env.NEXT_PUBLIC_URL + `/payment/stripe/${order.id}/success`,
        }
      ).then((res) => {
        setClientSecret(res.client_secret);
      });
    }
  }, [order]);

  return (
    <>
      {stripePromise && clientSecret && (
        <CheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <div className='space-y-4 flex flex-col mt-2'>
            <div className='text-xl font-bold'>
              Total: {formatCurrency(order.total_amount)}
            </div>

            <div>
              <CheckoutForm order={order} onSuccess={onSuccess} />
            </div>
          </div>
        </CheckoutProvider>
      )}
    </>
  );
}
