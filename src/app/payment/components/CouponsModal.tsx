'use strict';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ApiService from '@/service/ApiService';
import { useEffect, useMemo, useState } from 'react';
import { CouponType } from '../types';
// UI components (adjust imports if your UI library paths differ)
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CouponsModal({
  open,
  onOpenChange,
  selected,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: CouponType[];
  onSelect?: (coupons: CouponType[]) => void;
}) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set()
  );

  const getAvailableCoupons = () => {
    return ApiService.requestWithAuth('GET', '/customers/coupons');
  };

  // Load coupons
  useEffect(() => {
    if (!open) return;
    getAvailableCoupons().then((res) => {
      setCoupons(Array.isArray(res) ? res : []);
    });
  }, [open]);

  // Initialize selection from prop when modal opens or prop changes
  useEffect(() => {
    if (!open) return;
    const preset = new Set<string | number>(
      (selected ?? []).map((c) => c.documentId ?? c.id)
    );
    setSelectedIds(preset);
  }, [open, selected]);

  const selectedCoupons = useMemo(
    () => coupons.filter((c) => selectedIds.has(c.documentId ?? c.id)),
    [coupons, selectedIds]
  );

  // Grouping by coupon type
  const shippingCoupons = useMemo(
    () => coupons.filter((c) => c.coupon_type === 'Shipping'),
    [coupons]
  );
  const saleOrderCoupons = useMemo(
    () => coupons.filter((c) => c.coupon_type === 'Sale Order'),
    [coupons]
  );

  const toggleCoupon = (c: CouponType) => {
    const key = c.documentId ?? c.id;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleApply = () => {
    onSelect?.(selectedCoupons);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const formatDiscount = (c: CouponType) => {
    if (c.discount_type === 'percentage') return `${c.discount_value}%`;
    if (c.discount_type === 'fixed') return `${c.discount_value}`;
    return `${c.discount_value}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Coupons</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-3'>
          {coupons.length === 0 ? (
            <div className='text-sm text-muted-foreground'>
              No coupons available.
            </div>
          ) : (
            <ScrollArea className='max-h-72 pr-2'>
              <div className='space-y-4'>
                {shippingCoupons.length > 0 && (
                  <section>
                    <h4 className='text-sm font-medium mb-2'>Shipping</h4>
                    <ul className='space-y-2'>
                      {shippingCoupons.map((c) => {
                        const key = c.documentId ?? c.id;
                        const checked = selectedIds.has(key);
                        return (
                          <li
                            key={String(key)}
                            className='flex items-start gap-3 rounded-md border p-3'
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleCoupon(c)}
                              aria-label={`Select coupon ${c.name ?? c.code}`}
                            />
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center justify-between gap-2'>
                                <div className='font-medium truncate'>
                                  {c.name ?? c.code}
                                </div>
                              </div>
                              <div className='text-xs text-muted-foreground mt-0.5'>
                                Code:{' '}
                                <span className='font-mono'>{c.code}</span> •
                                Discount: {formatDiscount(c)}
                              </div>
                              {c.description ? (
                                <div className='text-sm mt-1'>
                                  {c.description}
                                </div>
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}

                {saleOrderCoupons.length > 0 && (
                  <section>
                    <h4 className='text-sm font-medium mb-2'>Sale Order</h4>
                    <ul className='space-y-2'>
                      {saleOrderCoupons.map((c) => {
                        const key = c.documentId ?? c.id;
                        const checked = selectedIds.has(key);
                        return (
                          <li
                            key={String(key)}
                            className='flex items-start gap-3 rounded-md border p-3'
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleCoupon(c)}
                              aria-label={`Select coupon ${c.name ?? c.code}`}
                            />
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center justify-between gap-2'>
                                <div className='font-medium truncate'>
                                  {c.name ?? c.code}
                                </div>
                              </div>
                              <div className='text-xs text-muted-foreground mt-0.5'>
                                Code:{' '}
                                <span className='font-mono'>{c.code}</span> •
                                Discount: {formatDiscount(c)}
                              </div>
                              {c.description ? (
                                <div className='text-sm mt-1'>
                                  {c.description}
                                </div>
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}
              </div>
            </ScrollArea>
          )}

          <div className='flex items-center justify-end gap-2 pt-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              {selectedCoupons.length > 0
                ? `Apply (${selectedCoupons.length})`
                : `Apply`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
