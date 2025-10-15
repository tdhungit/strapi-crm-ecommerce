'use client';

import { Button } from '@/components/ui/button';
import ApiService from '@/service/ApiService';
import UserService from '@/service/UserService';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addToCart } from '../stores/cartSlice';

interface Props {
  variant: any;
}

export default function AddToCartButton({ variant }: Props) {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    if (UserService.isLogin()) {
      ApiService.requestWithAuth('POST', '/customers/contact/cart', {
        localCart: cart,
      }).then();
    }
  }, [cart]);

  const handleAdd = () => {
    dispatch(
      addToCart({
        ...variant,
        cartQty: 1,
        price: variant.product_prices[0].price,
        beforePrice: variant.product_prices[0].before_price,
      })
    );

    toast.success('Product added to cart');
  };

  return (
    <>
      <Button className='w-full cursor-pointer' onClick={handleAdd}>
        Add to Cart
      </Button>
    </>
  );
}
