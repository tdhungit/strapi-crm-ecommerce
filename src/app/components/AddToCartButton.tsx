'use client';

import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { addToCart } from '../stores/cartSlice';

interface Props {
  product: any;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
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
