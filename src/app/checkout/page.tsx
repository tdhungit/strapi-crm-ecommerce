'use client';

import CartItem from '@/app/components/CartItem';
import { formatCurrency } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import UserService from '@/service/UserService';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/layouts/Loading';
import { removeFromCart, updateQty } from '../stores/cartSlice';
import LoginModal from '../user/components/LoginModal';

export default function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart.items);
  useEffect(() => {
    if (UserService.isLogin()) {
      ApiService.requestWithAuth('POST', '/customers/contact/cart', {
        localCart: cart,
      })
        .then()
        .catch((e) => {
          console.log('error', e);
        });
    }
  }, [cart]);

  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (acc: number, item: any) => acc + item.price * item.cartQty,
      0
    );

    const shipping = 0; // You can implement shipping calculation logic here
    const tax = 0; // 10% tax for example
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }, [cart]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleQuantityChange = (productId: number, newQty: number) => {
    dispatch(updateQty({ id: productId, cartQty: newQty }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleMergeCart = () => {
    ApiService.requestWithAuth('POST', '/customers/contact/cart', {
      localCart: cart,
    })
      .then(() => {
        router.push('/payment');
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  if (!isClient) {
    return <Loading />;
  }

  if (cart.length === 0) {
    return (
      <div className='max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow p-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Your cart is empty
          </h1>
          <p className='text-gray-600 mb-6'>
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={() => router.push('/')}
            className='bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

        <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
          {/* Cart Items */}
          <div className='p-4 lg:col-span-8 bg-white rounded-xl shadow overflow-hidden'>
            <div className='divide-y divide-gray-200'>
              {cart.map((item: any) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-4'>
            <div className='bg-white rounded-xl shadow p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Order Summary
              </h2>

              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium'>
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Discount</span>
                  <span className='font-medium'>
                    {formatCurrency(cart.discount_amount)}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax</span>
                  <span className='font-medium'>{formatCurrency(tax)}</span>
                </div>

                <div className='border-t border-gray-200 pt-4 mt-4'>
                  <div className='flex justify-between text-lg font-medium text-gray-900'>
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <button
                  onClick={() => {
                    if (!UserService.isLogin()) {
                      setOpenLoginModal(true);
                      return;
                    }
                    handleMergeCart();
                  }}
                  className='w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                >
                  Proceed to Checkout
                </button>
              </div>

              <div className='mt-4 text-center'>
                <p className='text-sm text-gray-500'>
                  or{' '}
                  <button
                    onClick={() => router.push('/')}
                    className='text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer'
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        open={openLoginModal}
        onOpenChange={setOpenLoginModal}
        onSuccess={() => {
          setOpenLoginModal(false);
          handleMergeCart();
        }}
      />
    </>
  );
}
