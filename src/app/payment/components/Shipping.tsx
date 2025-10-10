'use strict';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApiService from '@/service/ApiService';
import { useEffect, useState } from 'react';
import AddressesModal from './AddressesModal';

export default function Shipping({ onFinish }: { onFinish?: () => void }) {
  const [shippingMethods, setShippingMethods] = useState([] as any[]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [openManagerAddresses, setOpenManagerAddresses] = useState(false);

  useEffect(() => {
    ApiService.request('GET', '/shipping-methods').then((res) => {
      setShippingMethods(res);
    });

    ApiService.requestWithAuth(
      'GET',
      '/customers/contact-addresses/default'
    ).then((res) => {
      if (res.address) {
        setSelectedAddress(res.address);
      }
    });
  }, []);

  return (
    <>
      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedAddress ? (
            <div className='text-sm text-muted-foreground'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>
                  {selectedAddress.name
                    ? selectedAddress.name
                    : `Address #${selectedAddress.id}`}
                </span>
                <span className='text-xs text-muted-foreground'>
                  {[
                    selectedAddress.address,
                    selectedAddress.city,
                    selectedAddress.state,
                    selectedAddress.zipcode,
                    selectedAddress.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>
                {selectedAddress.phone || selectedAddress.email ? (
                  <span className='text-xs text-muted-foreground'>
                    {selectedAddress.phone
                      ? `Phone: ${selectedAddress.phone}`
                      : ''}
                    {selectedAddress.phone && selectedAddress.email
                      ? ' · '
                      : ''}
                    {selectedAddress.email
                      ? `Email: ${selectedAddress.email}`
                      : ''}
                  </span>
                ) : null}
                {selectedAddress.is_default ? (
                  <span className='text-[10px] text-green-600 mt-1'>
                    Default
                  </span>
                ) : null}
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='text-sm text-muted-foreground'>
                No shipping address available.
              </div>
            </div>
          )}

          <div className='mt-4'>
            <Button
              onClick={() => {
                setOpenManagerAddresses(true);
              }}
              variant='outline'
            >
              Manager Address
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddressesModal
        open={openManagerAddresses}
        onOpenChange={setOpenManagerAddresses}
        onSelect={(setAddress) => {
          setSelectedAddress(setAddress);
          setOpenManagerAddresses(false);
        }}
      />

      {/* Shipping Methods */}
      <Card className='mt-4'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          {shippingMethods &&
          shippingMethods.filter((m: any) => m?.enabled).length > 0 ? (
            <div
              role='radiogroup'
              aria-label='Shipping method'
              className='space-y-3'
            >
              {shippingMethods
                .filter((m: any) => m?.enabled)
                .map((m: any) => (
                  <label
                    key={m.id ?? m.documentId}
                    className='flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/30'
                  >
                    <input
                      type='radio'
                      name='shippingMethod'
                      value={m.id ?? m.documentId}
                      checked={
                        (selectedShippingMethod as any)?.id === m.id ||
                        (selectedShippingMethod as any)?.documentId ===
                          m.documentId
                      }
                      onChange={() => setSelectedShippingMethod(m as any)}
                      className='mt-1'
                    />
                    <div>
                      <div className='font-medium'>{m.name}</div>
                      {m.description ? (
                        <div className='text-sm text-muted-foreground'>
                          {m.description}
                        </div>
                      ) : null}
                    </div>
                  </label>
                ))}
            </div>
          ) : (
            <div className='text-sm text-muted-foreground'>
              No shipping methods available.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
