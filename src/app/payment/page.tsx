'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import ApiService from '@/service/ApiService';
import UserService from '@/service/UserService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Loading from '../components/layouts/Loading';
import { clearCart } from '../stores/cartSlice';
import Shipping from './components/Shipping';

interface PaymentMethod {
  id: number;
  documentId: string;
  name: string;
  description: string;
  options: any;
  enabled: boolean;
}

interface CartDetail {
  id: number;
  documentId: string;
  quantity: number;
  price: number;
  discount_amount: number;
  discount_type: string;
  tax_amount: number;
  tax_type: string;
  product_variant: {
    id: number;
    documentId: string;
    name: string;
    sku: string;
    variant_status: string;
    photos: Array<{
      id: number;
      url: string;
      name: string;
      formats: any;
    }>;
  };
}

interface Cart {
  id: number;
  documentId: string;
  subtotal: number;
  discount_amount: number;
  discount_type: string;
  tax_amount: number;
  tax_type: string;
  cart_details: CartDetail[];
}

export default function Payment() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);
  const warehouse = useSelector((state: any) => state.warehouse);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentRes, cartRes] = await Promise.all([
          ApiService.request('GET', '/public/payment-methods'),
          ApiService.requestWithAuth('GET', '/customers/contact/cart'),
        ]);

        setPaymentMethods(paymentRes);
        setCart(cartRes);

        // Auto-select first enabled payment method
        const enabledMethods = paymentRes.filter(
          (method: PaymentMethod) => method.enabled
        );
        if (enabledMethods.length > 0) {
          setSelectedPaymentMethod(enabledMethods[0].name);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !warehouse.warehouse?.id) {
      toast.error('Please select a payment method and warehouse.');
      return;
    }

    setIsProcessing(true);
    try {
      const order = await ApiService.requestWithAuth(
        'POST',
        '/customers/contact/orders',
        {
          payment_method: selectedPaymentMethod,
          warehouseId: warehouse.warehouse?.id,
        }
      );
      // Clear cart
      dispatch(clearCart());
      localStorage.removeItem('cart');
      // Payment method processing
      router.push(`/payment/${selectedPaymentMethod}/${order.id}`);
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    const subtotal = cart.subtotal;
    const discount =
      cart.discount_type === 'percentage'
        ? subtotal * (cart.discount_amount / 100)
        : cart.discount_amount;
    const tax =
      cart.tax_type === 'percentage'
        ? (subtotal - discount) * (cart.tax_amount / 100)
        : cart.tax_amount;
    return subtotal - discount + tax;
  };

  useEffect(() => {
    if (isClient && !UserService.isLogin()) {
      router.push('/user/login?returnTo=/payment');
    }
  }, [isClient, router]);

  if (!isClient || !cart) {
    return <Loading />;
  }

  const enabledPaymentMethods = paymentMethods.filter(
    (method) => method.enabled
  );

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {cart.cart_details.map((detail) => (
                  <div
                    key={detail.documentId}
                    className='flex items-center space-x-4'
                  >
                    {detail.product_variant.photos?.[0] && (
                      <img
                        src={`${ApiService.API_URL_PUBLIC}${detail.product_variant.photos[0].url}`}
                        alt={detail.product_variant.name}
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                    )}
                    <div className='flex-1'>
                      <h3 className='font-medium'>
                        {detail.product_variant.name}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        SKU: {detail.product_variant.sku}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Quantity: {detail.quantity}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>${detail.price.toFixed(2)}</p>
                      {detail.discount_amount > 0 && (
                        <p className='text-sm text-green-600'>
                          -$
                          {(detail.discount_type === 'percentage'
                            ? detail.price * (detail.discount_amount / 100)
                            : detail.discount_amount
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <div className='mt-4'>
            <Shipping />
          </div>

          {/* Payment Methods */}
          <Card className='mt-4'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <>
                {enabledPaymentMethods.length === 0 ? (
                  <p className='text-muted-foreground'>
                    No payment methods available.
                  </p>
                ) : (
                  <RadioGroup
                    value={selectedPaymentMethod}
                    onValueChange={(value) => {
                      setSelectedPaymentMethod(value);
                    }}
                  >
                    <div className='space-y-4'>
                      {enabledPaymentMethods.map((method) => (
                        <div
                          key={method.documentId}
                          className='flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors'
                        >
                          <RadioGroupItem
                            value={method.name}
                            id={method.documentId}
                          />
                          <Label
                            htmlFor={method.documentId}
                            className='flex-1 cursor-pointer'
                          >
                            <div className='flex items-center justify-between'>
                              <div>
                                <p className='font-medium capitalize'>
                                  {method.description || method.name}
                                </p>
                              </div>
                              <div className='text-sm text-muted-foreground pl-1'>
                                {method.name === 'COD' && '💰'}
                                {method.name === 'paypal' && '💳'}
                                {method.name === 'stripe' && '💳'}
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </>
            </CardContent>
          </Card>
        </div>

        {/* Order Total */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-6'>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Order Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                {cart.discount_amount > 0 && (
                  <div className='flex justify-between text-green-600'>
                    <span>Discount</span>
                    <span>
                      -$
                      {(cart.discount_type === 'percentage'
                        ? cart.subtotal * (cart.discount_amount / 100)
                        : cart.discount_amount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                {cart.tax_amount > 0 && (
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>
                      $
                      {(cart.tax_type === 'percentage'
                        ? (cart.subtotal -
                            (cart.discount_type === 'percentage'
                              ? cart.subtotal * (cart.discount_amount / 100)
                              : cart.discount_amount)) *
                          (cart.tax_amount / 100)
                        : cart.tax_amount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className='flex justify-between font-bold text-lg'>
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button
                className='w-full mt-6'
                size='lg'
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
