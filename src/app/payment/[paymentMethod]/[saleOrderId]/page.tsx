import ApiService from '@/service/ApiService';
import Paypal from '../../components/Paypal';

interface Props {
  params: Promise<{ paymentMethod: string; saleOrderId: string }>;
}

export default async function PaymentMethod({ params }: Props) {
  const { paymentMethod: paymentMethodName, saleOrderId } = await params;

  const order = await ApiService.requestWithAuth(
    'GET',
    `/customers/contact/orders/${saleOrderId}`
  );

  if (!order) {
    return (
      <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden'>
        <div className='text-red-500 flex justify-center items-center'>
          Order not found
        </div>
      </div>
    );
  }

  const paymentMethod = await ApiService.request(
    'GET',
    `/payment-methods/${paymentMethodName}/details`
  );

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
      <h1 className='text-2xl font-bold'>Processing...</h1>

      <div className='mt-4'>
        {paymentMethod.name === 'COD' && (
          <div>
            <h2 className='text-xl font-bold'>Cash on Delivery</h2>
            <p className='text-gray-500'>
              Please pay the amount to the store owner.
            </p>
          </div>
        )}

        {paymentMethod.name === 'paypal' && (
          <Paypal order={order} paymentMethod={paymentMethod} />
        )}
      </div>
    </div>
  );
}
