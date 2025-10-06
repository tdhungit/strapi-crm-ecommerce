'use client';

import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { addToCart } from '../stores/cartSlice';

interface Props {
  variant: any;
}

export default function AddToCartButton({ variant }: Props) {
  const dispatch = useDispatch();

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
      <Button className='cursor-pointer' onClick={handleAdd}>
        Add to Cart
      </Button>
    </>
  );
}
