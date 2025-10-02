'use client';

import { RootState } from '@/app/stores/index';
import { setWarehouseStore } from '@/app/stores/warehouseSlice';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { WarehouseType } from '@/lib/settings';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WarehouseSelect({
  warehouses,
}: {
  warehouses: WarehouseType[];
}) {
  const dispatch = useDispatch();
  const warehouse = useSelector(
    (state: RootState) => state.warehouse.warehouse
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    let warehouse: WarehouseType | null = null;
    const warehouseJson = localStorage.getItem('warehouse');
    if (warehouseJson) {
      warehouse = JSON.parse(warehouseJson);
    } else {
      warehouse = warehouses[0];
    }

    if (!warehouse) {
      return;
    }

    setValue(warehouse.name);
    dispatch(setWarehouseStore(warehouse));
    localStorage.setItem('warehouse', JSON.stringify(warehouse));
  }, []);

  useEffect(() => {
    if (warehouse) {
      setValue(warehouse.name);
    }
  }, [warehouse]);

  const onSelectWarehouse = (warehouse: WarehouseType) => {
    setValue(warehouse.name);
    setOpen(false);
    dispatch(setWarehouseStore(warehouse));
    localStorage.setItem('warehouse', JSON.stringify(warehouse));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value || 'Select warehouse...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search warehouse...' className='h-9' />
          <CommandList>
            <CommandEmpty>No warehouse found.</CommandEmpty>
            <CommandGroup>
              {warehouses.map((warehouse) => (
                <CommandItem
                  key={warehouse.id}
                  value={warehouse.name}
                  onSelect={() => onSelectWarehouse(warehouse)}
                >
                  {warehouse.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === warehouse.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
