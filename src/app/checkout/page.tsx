'use client';

import { useSelector } from 'react-redux';

export default function Checkout() {
  const user = useSelector((state: any) => state.user);

  return <div>page</div>;
}
