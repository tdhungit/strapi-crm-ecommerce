'use client';

interface Props {
  product: any;
}

export default function ProductDescription({ product }: Props) {
  return (
    <div className='bg-white p-4 rounded-xl'>
      <h2 className='font-bold text-xl mb-2'>Description</h2>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  );
}
