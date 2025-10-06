'use client';

import { RootState } from '@/app/stores';
import { setUserStore } from '@/app/stores/userSlice';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GlobalSettingType } from '@/lib/settings';
import { formatCurrency, getMediaUrl } from '@/lib/utils';
import ApiService from '@/service/ApiService';
import UserService from '@/service/UserService';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from '../NavLink';
import UserMenuDropdown from './UserMenuDropdown';
import WarehouseSelect from './WarehouseSelect';

function PopoverCart() {
  const cart = useSelector((state: RootState) => state.cart.items);

  const [totalQty, setTotalQty] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotalQty(cart.reduce((total, item) => total + item.cartQty, 0));
    setTotal(
      cart.reduce((total, item) => total + item.price * item.cartQty, 0)
    );
  }, [cart]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <a href='javascript:void(0)' className='flex items-center'>
          <ShoppingCart />
          <Badge
            className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
            variant='destructive'
          >
            {totalQty}
          </Badge>
        </a>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <div className='p-4'>
          <div className='flex flex-col gap-2'>
            {cart.map((item: any) => (
              <div key={item.id} className='flex gap-2'>
                <img
                  src={getMediaUrl(item.photos[0])}
                  alt={item.name}
                  className='w-16 h-16 object-cover'
                />
                <div className='flex-1'>
                  <h3 className='font-bold text-sm'>{item.name}</h3>
                  <p className='text-sm text-gray-500'>
                    {item.cartQty} x {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center mt-4'>
            <p className='font-bold'>Total: {formatCurrency(total)}</p>
            <button className='bg-primary text-white px-4 py-2 rounded'>
              Checkout
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Header({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const [links, setLinks] = useState<{ href: string; label: string }[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    ApiService.request('GET', '/product-categories').then((categories: any) => {
      const _links = [{ href: '/', label: 'Home' }];
      if (categories?.data && categories.data.length > 0) {
        categories.data.forEach((category: any) => {
          _links.push({
            href: `/category/${category.slug}/${category.id}`,
            label: category.name,
          });
        });
      }
      _links.push({ href: '/about-us', label: 'About Us' });

      setLinks(_links);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setUser(null);
      dispatch(setUserStore(null));
      return;
    }

    if (UserService.isLogin()) {
      ApiService.requestWithAuth('GET', '/customers/contact/me')
        .then((user: any) => {
          setUser(user);
          dispatch(setUserStore(user));
        })
        .catch((err) => {
          console.log(err);
          // Logout
          UserService.logout();
          setUser(null);
          dispatch(setUserStore(null));
        });
    }
  }, [token]);

  return (
    <header className='bg-white/50'>
      <nav className='container mx-auto flex justify-between items-center py-4'>
        <Link href='/'>
          {globalSettings.title || 'Strapi CRM & E-Commerce'}
        </Link>

        <div className='flex gap-4'>
          <WarehouseSelect warehouses={globalSettings.warehouses || []} />
        </div>

        <div className='flex gap-4'>
          <ul className='flex gap-4'>
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </ul>
          <div className='text-gray-500'>
            {user ? (
              <UserMenuDropdown user={user} />
            ) : (
              <Link href='/user/login'>Login</Link>
            )}
          </div>
          <PopoverCart />
        </div>
      </nav>
    </header>
  );
}
