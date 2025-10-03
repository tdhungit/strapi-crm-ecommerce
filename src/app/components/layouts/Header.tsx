'use client';

import { GlobalSettingType } from '@/lib/settings';
import ApiService from '@/service/ApiService';
import UserService from '@/service/UserService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLink from '../NavLink';
import WarehouseSelect from './WarehouseSelect';

export default function Header({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
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

    if (UserService.isLogin()) {
      ApiService.requestWithAuth('GET', '/customers/contact/me').then(
        (user: any) => {
          setUser(user);
        }
      );
    }
  }, []);

  return (
    <header className='bg-white/50'>
      <nav className='container mx-auto flex justify-between items-center py-4'>
        <Link href='/'>
          {globalSettings.title || 'Strapi CRM & E-Commerce'}
        </Link>

        <div className='flex gap-4'>
          <WarehouseSelect warehouses={globalSettings.warehouses || []} />
        </div>

        <ul className='flex gap-4'>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}
