'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, getMediaUrl } from '@/lib/utils';
import { Calendar, DollarSign, Hash, Package, Tag } from 'lucide-react';

interface Photo {
  url: string;
  [key: string]: any;
}

interface ProductVariant {
  id: number;
  documentId: string;
  name: string;
  sku: string;
  variant_status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  photos: Photo[];
}

interface SaleOrderDetail {
  id: number;
  documentId: string;
  unit_price: number;
  quantity: number;
  discount_type: string;
  tax_type: string;
  discount_amount: number;
  tax_amount: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  product_variant: ProductVariant;
}

interface Order {
  id: number;
  documentId: string;
  name: string;
  sale_date: string;
  order_status: string;
  subtotal: number;
  discount_type: string;
  discount_amount: number;
  tax_type: string;
  tax_amount: number;
  total_amount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  sale_order_details: SaleOrderDetail[];
}

export default function MyOrderDetail({ order }: { order: Order }) {
  return (
    <div className='border-t bg-muted/30'>
      <div className='p-6 space-y-6'>
        {/* Order Summary */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-background p-4 rounded-lg border'>
            <div className='flex items-center gap-2 mb-2'>
              <Hash className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Order ID</span>
            </div>
            <p className='font-semibold'>{order.name}</p>
          </div>

          <div className='bg-background p-4 rounded-lg border'>
            <div className='flex items-center gap-2 mb-2'>
              <Calendar className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Order Date</span>
            </div>
            <p className='font-semibold'>{formatDate(order.sale_date)}</p>
          </div>

          <div className='bg-background p-4 rounded-lg border'>
            <div className='flex items-center gap-2 mb-2'>
              <Package className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Total Items</span>
            </div>
            <p className='font-semibold'>
              {order.sale_order_details.length} item(s)
            </p>
          </div>

          <div className='bg-background p-4 rounded-lg border'>
            <div className='flex items-center gap-2 mb-2'>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>
                Total Amount
              </span>
            </div>
            <p className='font-semibold'>${order.total_amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {order.sale_order_details.map((detail) => (
                <div
                  key={detail.documentId}
                  className='flex items-start gap-4 p-4 rounded-lg border bg-card'
                >
                  {detail.product_variant.photos?.[0] && (
                    <img
                      src={getMediaUrl(detail.product_variant.photos?.[0])}
                      alt={detail.product_variant.name}
                      className='w-16 h-16 object-cover rounded-lg flex-shrink-0'
                    />
                  )}
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-medium text-sm'>
                      {detail.product_variant.name}
                    </h4>
                    <p className='text-xs text-muted-foreground mb-1'>
                      SKU: {detail.product_variant.sku}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                      <span>Qty: {detail.quantity}</span>
                      <span>${detail.unit_price.toFixed(2)} each</span>
                      {detail.discount_amount > 0 && (
                        <span className='text-green-600'>
                          -$
                          {(detail.discount_type === 'percentage'
                            ? detail.unit_price *
                              detail.quantity *
                              (detail.discount_amount / 100)
                            : detail.discount_amount
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-sm'>
                      ${detail.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className='flex justify-between text-sm text-green-600'>
                  <span>Discount</span>
                  <span>
                    -$
                    {(order.discount_type === 'percentage'
                      ? order.subtotal * (order.discount_amount / 100)
                      : order.discount_amount
                    ).toFixed(2)}
                  </span>
                </div>
              )}
              {order.tax_amount > 0 && (
                <div className='flex justify-between text-sm'>
                  <span>Tax</span>
                  <span>
                    $
                    {(order.tax_type === 'percentage'
                      ? (order.subtotal -
                          (order.discount_type === 'percentage'
                            ? order.subtotal * (order.discount_amount / 100)
                            : order.discount_amount)) *
                        (order.tax_amount / 100)
                      : order.tax_amount
                    ).toFixed(2)}
                  </span>
                </div>
              )}
              <Separator />
              <div className='flex justify-between font-semibold text-base'>
                <span>Total</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </div>

            <div className='mt-4 pt-4 border-t'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Tag className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm text-muted-foreground'>Status</span>
                </div>
                <Badge variant='default'>{order.order_status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
