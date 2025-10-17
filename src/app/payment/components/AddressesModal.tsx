'use strict';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ApiService from '@/service/ApiService';
import { PlusCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AddressFormModal from './AddressFormModal';

type Address = {
  id: number;
  documentId: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  [key: string]: any;
};

export default function AddressesModal({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (address: Address) => void;
}) {
  const [refreshing, setRefreshing] = useState<number>(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [openForm, setOpenForm] = useState(false);
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    ApiService.requestWithAuth('GET', '/customers/contact-addresses')
      .then((res: Address[]) => {
        setAddresses(res || []);
      })
      .catch(() => {
        setAddresses([]);
      });
  }, [open, refreshing]);

  // Set default selection whenever addresses change
  useEffect(() => {
    if (addresses.length === 0) {
      setSelectedAddressId(null);
      return;
    }
    const def = addresses.find((a) => a.is_default) ?? addresses[0];
    setSelectedAddressId(def.id);
  }, [addresses]);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  function handleConfirm() {
    if (selectedAddress) {
      onSelect?.(selectedAddress);
      onOpenChange(false);
    }
  }

  async function setDefaultAddress(id: number) {
    try {
      setSettingDefaultId(id);
      await ApiService.requestWithAuth(
        'PUT',
        `/customers/contact-addresses/set-default/${id}`
      );
      setRefreshing((r) => r + 1);
    } finally {
      setSettingDefaultId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>My Addresses</DialogTitle>
        </DialogHeader>

        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1'>
            <div className='mb-2 font-medium'>Select an address</div>
            {addresses.length > 0 ? (
              <ul className='space-y-2'>
                {addresses.map((addr) => {
                  const checked = selectedAddressId === addr.id;
                  return (
                    <li
                      key={addr.id}
                      className={`rounded border p-3 ${
                        checked ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <label className='flex items-center gap-3 cursor-pointer'>
                          <input
                            type='radio'
                            name='address'
                            checked={checked}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className='h-4 w-4'
                          />
                          <div className='flex flex-col'>
                            <span className='text-sm font-semibold'>
                              {addr.name ? addr.name : `Address #${addr.id}`}
                            </span>
                            <span className='text-xs text-muted-foreground'>
                              {[
                                addr.address,
                                addr.city,
                                addr.state,
                                addr.zipcode,
                                addr.country,
                              ]
                                .filter(Boolean)
                                .join(', ')}
                            </span>
                            {addr.phone || addr.email ? (
                              <span className='text-xs text-muted-foreground'>
                                {addr.phone ? `Phone: ${addr.phone}` : ''}
                                {addr.phone && addr.email ? ' · ' : ''}
                                {addr.email ? `Email: ${addr.email}` : ''}
                              </span>
                            ) : null}
                            {addr.is_default ? (
                              <span className='text-[10px] text-green-600 mt-1'>
                                Default
                              </span>
                            ) : null}
                          </div>
                        </label>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => setDefaultAddress(addr.id)}
                          disabled={
                            addr.is_default || settingDefaultId === addr.id
                          }
                        >
                          {addr.is_default
                            ? 'Default'
                            : settingDefaultId === addr.id
                            ? 'Setting...'
                            : 'Set default'}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className='text-sm text-muted-foreground'>
                No addresses yet.
              </div>
            )}
          </div>
        </div>

        <div className=''>
          <Button onClick={() => setOpenForm(true)} variant='secondary'>
            <PlusCircle className='mr-2 h-4 w-4' /> Add Address
          </Button>
        </div>

        <div className='mt-4 flex justify-end gap-2'>
          <Button variant='ghost' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedAddress}>
            Use this address
          </Button>
        </div>

        <AddressFormModal
          open={openForm}
          onOpenChange={setOpenForm}
          onFinish={(newAddress: any) => {
            // After adding, refresh list and preselect new one if possible
            setOpenForm(false);
            setRefreshing((r) => r + 1);
            // If API returns the created address with id, preselect it
            if (newAddress?.id) {
              setSelectedAddressId(newAddress.id);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
