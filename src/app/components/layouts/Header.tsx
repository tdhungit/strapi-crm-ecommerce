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
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserMenuDropdown from './UserMenuDropdown';
import WarehouseSelect from './WarehouseSelect';

interface MenuLinkItem {
  href: string;
  label: string;
  children?: MenuLinkItem[];
}

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

function HeaderComponent({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const searchParams = useSearchParams();
  const search = searchParams.get('keyword');

  const [links, setLinks] = useState<MenuLinkItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    ApiService.request('GET', '/product-categories/extra/tree?status=Active')
      .then((categories: any) => {
        const _links = [{ href: '/', label: 'Home' }];
        if (categories?.length > 0) {
          categories.forEach((category: any) => {
            const linkItem: MenuLinkItem = {
              href: `/category/${category.slug}/${category.id}`,
              label: category.name,
              children: [],
            };

            if (category.children?.length > 0) {
              category.children.forEach((child: any) => {
                const childLinkItem = {
                  href: `/category/${child.slug}/${child.id}`,
                  label: child.name,
                };
                linkItem.children = linkItem.children || [];
                linkItem.children.push(childLinkItem);
              });
            }

            _links.push(linkItem);
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
    setSearchQuery(search || '');
  }, [search]);

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
          className='text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-200 flex gap-2'
        >
          {globalSettings.logo && (
            <img
              src={getMediaUrl(globalSettings.logo)}
              alt={globalSettings.title || 'Strapi CRM & E-Commerce'}
              className='h-[32px] object-cover'
            />
          )}
          {globalSettings.title || 'Strapi CRM & E-Commerce'}
        </Link>

        {/* Search Bar - Desktop */}
        <form
          action='/search'
          method='get'
          className='hidden md:flex items-center flex-1 max-w-2xl mx-8'
        >
          <div className='relative w-full'>
            <input
              type='text'
              name='keyword'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search products...'
              className='w-full px-4 py-1 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white shadow'
            />
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          </div>
        </form>

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

      {/* Navigation Menu - New Line */}
      <div className='hidden md:block border-t border-gray-100 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center justify-center'>
            <ul className='flex items-center gap-8 py-3'>
              {links.map((link) => (
                <li key={link.href} className='relative group'>
                  <Link
                    href={link.href}
                    className='text-black hover:text-gray-700 font-medium transition-colors duration-200 relative flex items-center gap-1'
                  >
                    {link.label}
                  </Link>
                  <span className='absolute bottom-[-4px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200'></span>

                  {link.children && link.children.length > 0 && (
                    <div className='pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 absolute left-[-7px] top-[25px] mt-0 min-w-[220px] rounded-md border border-gray-200 bg-white shadow-lg z-50'>
                      <ul className='py-2'>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className='block px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-colors'
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden border-t border-gray-200 bg-white'>
        <div className='container mx-auto px-4 py-2'>
          {/* Mobile Search */}
          <form action='/search' method='get' className='mb-3'>
            <div className='relative w-full'>
              <input
                name='keyword'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search products...'
                className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
              />
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            </div>
          </form>
          <nav>
            <ul className='flex flex-col gap-2'>
              {links.map((link) => (
                <li key={link.href} className='flex flex-col'>
                  <Link
                    href={link.href}
                    className='text-sm text-black hover:text-gray-700 font-medium py-1'
                  >
                    {link.label}
                  </Link>
                  {link.children && link.children.length > 0 && (
                    <ul className='ml-3 pl-2 border-l border-gray-200 mt-1 flex flex-col gap-1'>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className='text-xs text-black/80 hover:text-black py-1 block'
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
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

export default function Header({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderComponent globalSettings={globalSettings} />
    </Suspense>
  );
}
