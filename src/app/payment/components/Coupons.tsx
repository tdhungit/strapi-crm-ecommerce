'use strict';

import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { CouponType } from '../types';
import CouponsModal from './CouponsModal';

export default function Coupons({
  initValues,
  onChange,
}: {
  initValues?: CouponType[];
  onChange?: (values: CouponType[]) => void;
}) {
  const [values, setValues] = useState<CouponType[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (values: CouponType[]) => {
    setValues(values);
    if (onChange) onChange(values);
  };

  useEffect(() => {
    if (!initValues) return;
    if (initValues?.length === 0) return;
    setValues(initValues);
  }, [initValues]);

  return (
    <div>
      {values.length === 0 && (
        <div onClick={() => setOpen(true)} className='cursor-pointer'>
          <p className='text-gray-400 text-xs'>No coupons available</p>
        </div>
      )}
      {values.length > 0 && (
        <div
          onClick={() => setOpen(true)}
          className='flex space-x-1 cursor-pointer'
        >
          {values.map((v: any) => (
            <Badge
              key={v.id}
              variant='outline'
              className='text-xs bg-blue-500 text-white dark:bg-blue-600'
            >
              {v.name || v.code}
            </Badge>
          ))}
        </div>
      )}
      <CouponsModal
        open={open}
        onOpenChange={setOpen}
        onSelect={(v) => {
          handleChange(v);
        }}
        selected={values}
      />
    </div>
  );
}
