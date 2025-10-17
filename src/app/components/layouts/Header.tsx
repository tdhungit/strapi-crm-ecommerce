'use client';

import { RootState } from '@/app/stores';
import { setTokenStore, setUserStore } from '@/app/stores/userSlice';
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
import { PopoverClose } from '@radix-ui/react-popover';
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
        <div className='relative flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200'>
          <ShoppingCart className='w-6 h-6 text-black' />
          {totalQty > 0 && (
            <Badge className='absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-black text-white hover:bg-gray-800'>
              {totalQty}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0 border border-gray-200 shadow-lg'>
        <div className='p-6 bg-white'>
          <h3 className='text-lg font-bold text-black mb-4'>Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className='text-gray-500 text-center py-4'>Your cart is empty</p>
          ) : (
            <>
              <div className='flex flex-col gap-4 max-h-64 overflow-y-auto'>
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className='flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors'
                  >
                    <img
                      src={getMediaUrl(item.photos[0])}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-lg border border-gray-200'
                    />
                    <div className='flex-1'>
                      <h4 className='font-semibold text-black text-sm mb-1'>
                        {item.name}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {item.cartQty} × {formatCurrency(item.price)}
                      </p>
                      <p className='text-sm font-medium text-black'>
                        {formatCurrency(item.price * item.cartQty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='border-t border-gray-200 mt-4 pt-4'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-lg font-bold text-black'>
                    Total: {formatCurrency(total)}
                  </span>
                </div>
                <PopoverClose asChild>
                  <Link
                    href='/checkout'
                    className='w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-center block'
                  >
                    Proceed to Checkout
                  </Link>
                </PopoverClose>
              </div>
            </>
          )}
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
    ApiService.request('GET', '/product-categories')
      .then((categories: any) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const accessToken = token || UserService.getAccessToken();
    if (!accessToken) {
      setUser(null);
      dispatch(setUserStore(null));
      return;
    }

    if (UserService.isLogin()) {
      ApiService.requestWithAuth('GET', '/customers/contact/me')
        .then((user: any) => {
          setUser(user);
          dispatch(setUserStore(user));
          dispatch(setTokenStore(accessToken));
        })
        .catch((err) => {
          console.log(err);
          // Logout
          UserService.logout();
          setUser(null);
          dispatch(setUserStore(null));
          dispatch(setTokenStore(''));
        });
    }
  }, [token]);

  return (
    <header className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto flex justify-between items-center py-4 px-4'>
        {/* Logo/Brand */}
        <Link
          href='/'
          className='text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-200'
        >
          {globalSettings.title || 'Strapi CRM & E-Commerce'}
        </Link>

        {/* Navigation Links - Center */}
        <nav className='hidden md:flex items-center'>
          <ul className='flex items-center gap-8'>
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className='text-black hover:text-gray-700 font-medium transition-colors duration-200 relative group'
              >
                {link.label}
                <span className='absolute bottom-[-4px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200'></span>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className='flex items-center gap-4'>
          {/* Warehouse Select */}
          <div className='hidden lg:block'>
            <WarehouseSelect warehouses={globalSettings.warehouses || []} />
          </div>

          {/* User Menu */}
          <div className='flex items-center'>
            {user ? (
              <UserMenuDropdown user={user} />
            ) : (
              <Link
                href='/user/login'
                className='text-black font-medium px-4 py-1 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-all duration-200'
              >
                Login
              </Link>
            )}
          </div>

          {/* Shopping Cart */}
          <PopoverCart />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className='md:hidden border-t border-gray-200 bg-white'>
        <div className='container mx-auto px-4 py-2'>
          <nav>
            <ul className='flex flex-wrap gap-4 justify-center'>
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  className='text-sm text-black hover:text-gray-700 font-medium py-1'
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </nav>
          <div className='mt-2 flex justify-center lg:hidden'>
            <WarehouseSelect warehouses={globalSettings.warehouses || []} />
          </div>
        </div>
      </div>
    </header>
  );
}
