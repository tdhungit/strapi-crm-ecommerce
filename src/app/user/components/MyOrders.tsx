'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import UserService from '@/service/UserService';
import { Eye, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import MyOrderDetailModal from './MyOrderDetailModal';

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const [selectOrder, setSelectOrder] = useState<any>(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await UserService.getOrders({
          page: currentPage,
          pageSize: 10,
        });
        setOrders(res.data);
        setPagination(res.meta.pagination);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleOpenOrderModal = (order: any) => {
    setSelectOrder(order);
    setOpenOrderModal(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>Loading your orders...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center items-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>You haven't placed any orders yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <Package className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
            <p className='text-muted-foreground'>
              No orders found. Start shopping to see your orders here!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-sm text-muted-foreground mb-4'>
            Showing {orders.length} of {pagination?.total || 0} orders
          </div>

          <div className='rounded-md border'>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-muted/50'>
                  <tr className='border-b'>
                    <th className='p-3 text-left font-medium'>Order ID</th>
                    <th className='p-3 text-left font-medium'>Date</th>
                    <th className='p-3 text-left font-medium'>Status</th>
                    <th className='p-3 text-left font-medium'>Items</th>
                    <th className='p-3 text-right font-medium'>Total</th>
                    <th className='p-3 text-right font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.documentId}
                      className='border-b hover:bg-muted/50 transition-colors'
                    >
                      <td className='p-3 font-medium'>{order.name}</td>
                      <td className='p-3 text-muted-foreground'>
                        {formatDate(order.sale_date)}
                      </td>
                      <td className='p-3'>
                        <Badge variant='default'>{order.order_status}</Badge>
                      </td>
                      <td className='p-3'>
                        <div className='flex items-center gap-1 text-muted-foreground'>
                          <Package className='h-3 w-3' />
                          {order.sale_order_details.length} item(s)
                        </div>
                      </td>
                      <td className='p-3 text-right font-medium'>
                        ${order.total_amount.toFixed(2)}
                      </td>
                      <td className='p-3 text-right'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-7 px-2'
                          onClick={() => handleOpenOrderModal(order)}
                        >
                          <Eye className='h-3 w-3 mr-1' />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination && pagination.pageCount > 1 && (
            <div className='flex items-center justify-between pt-4'>
              <div className='text-sm text-muted-foreground'>
                Page {pagination.page} of {pagination.pageCount}
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className='flex gap-1'>
                  {Array.from(
                    { length: pagination.pageCount },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => handlePageChange(page)}
                      className='min-w-8'
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={currentPage === pagination.pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectOrder && (
        <MyOrderDetailModal
          order={selectOrder}
          open={openOrderModal}
          onOpenChange={setOpenOrderModal}
        />
      )}
    </div>
  );
}
