'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ApiService from '@/service/ApiService';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Address = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export default function AddressFormModal({
  open,
  onOpenChange,
  initialAddress,
  onFinish,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialAddress?: Partial<Address>;
  onFinish?: (address: Address) => void;
}) {
  // RHF
  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Address>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    mode: 'onSubmit',
  });

  // Prefill when initialAddress changes
  useEffect(() => {
    if (initialAddress) {
      reset({
        fullName: initialAddress.fullName ?? '',
        email: initialAddress.email ?? '',
        phone: initialAddress.phone ?? '',
        address: initialAddress.address ?? '',
        city: initialAddress.city ?? '',
        state: initialAddress.state ?? '',
        postalCode: initialAddress.postalCode ?? '',
        country: initialAddress.country ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAddress]);

  // Data lists
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // Load countries when modal opens
  useEffect(() => {
    if (open) {
      ApiService.request('GET', '/address/countries').then((res: any) =>
        setCountries(res || [])
      );
    }
  }, [open]);

  const country = watch('country');
  const stateVal = watch('state');

  // When country changes, clear state/city and fetch states
  useEffect(() => {
    if (country) {
      setStates([]);
      setCities([]);
      resetField('state');
      resetField('city');
      ApiService.request(
        'GET',
        `/address/countries/${country}/states`
      ).then((res: any) => setStates(res || []));
    } else {
      setStates([]);
      setCities([]);
      resetField('state');
      resetField('city');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  // When state changes, clear city and fetch cities
  useEffect(() => {
    if (stateVal) {
      setCities([]);
      resetField('city');
      ApiService.request(
        'GET',
        `/address/states/${stateVal}/cities`
      ).then((res: any) => setCities(res || []));
    } else {
      setCities([]);
      resetField('city');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateVal]);

  const onSubmit = handleSubmit(async (data) => {
    const payload: Address = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      address: data.address.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      postalCode: data.postalCode.trim(),
      country: data.country.trim(),
    };

    const res = await ApiService.requestWithAuth(
      'POST',
      '/customers/contact-addresses',
      payload
    );
    // Reset then close
    reset();
    setStates([]);
    setCities([]);
    onOpenChange?.(false);
    onFinish?.(res);
  });

  // Helper for showing error text
  const ErrorText = ({ msg }: { msg?: string }) =>
    msg ? <span className="text-xs text-destructive mt-1">{msg}</span> : null;

  // Compose placeholders
  const countryPlaceholder = useMemo(
    () => (countries.length ? 'Select a country' : 'Loading countries...'),
    [countries.length]
  );
  const statePlaceholder = useMemo(
    () =>
      country
        ? states.length
          ? 'Select a state'
          : 'Loading states...'
        : 'Select country first',
    [country, states.length]
  );
  const cityPlaceholder = useMemo(
    () =>
      stateVal
        ? cities.length
          ? 'Select a city'
          : 'Loading cities...'
        : 'Select state first',
    [stateVal, cities.length]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add shipping address</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">
              Full name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName', { required: 'Full name is required' })}
            />
            <ErrorText msg={errors.fullName?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="<EMAIL>"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email',
                },
              })}
            />
            <ErrorText msg={errors.email?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              inputMode="tel"
              placeholder="+1 555 123 4567"
              {...register('phone', { required: 'Phone is required' })}
            />
            <ErrorText msg={errors.phone?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              placeholder="123 Main St"
              {...register('address', { required: 'Address is required' })}
            />
            <ErrorText msg={errors.address?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>
                Country <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="country"
                rules={{ required: 'Country is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                    >
                      <SelectTrigger aria-required className="w-full">
                        <SelectValue placeholder={countryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c: any) => (
                          <SelectItem key={c.id} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorText msg={errors.country?.message} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label>
                State/Province <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="state"
                rules={{ required: 'State/Province is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                      disabled={!country || states.length === 0}
                    >
                      <SelectTrigger aria-required className="w-full">
                        <SelectValue placeholder={statePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s: any) => (
                          <SelectItem key={s.id} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorText msg={errors.state?.message} />
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>
                City <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="city"
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                      disabled={!stateVal || cities.length === 0}
                    >
                      <SelectTrigger aria-required className="w-full">
                        <SelectValue placeholder={cityPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c: any) => (
                          <SelectItem key={c.id} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorText msg={errors.city?.message} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postalCode">
                Postal code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="postalCode"
                inputMode="numeric"
                {...register('postalCode', {
                  required: 'Postal code is required',
                })}
              />
              <ErrorText msg={errors.postalCode?.message} />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange?.(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save address'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}