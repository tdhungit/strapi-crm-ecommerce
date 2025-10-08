'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MyOrderDetail from './MyOrderDetail';

export default function MyOrderDetailModal({
  order,
  open,
  onOpenChange,
}: {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div>
          <MyOrderDetail order={order} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
