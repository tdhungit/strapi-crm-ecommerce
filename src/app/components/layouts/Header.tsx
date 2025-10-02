'use client';

import { GlobalSettingType } from '@/lib/settings';
import Link from 'next/link';
import NavLink from '../NavLink';
import WarehouseSelect from './WarehouseSelect';

export default function Header({
  globalSettings,
  categories,
}: {
  globalSettings: GlobalSettingType;
  categories?: { data: any[] };
}) {
  const links = [{ href: '/', label: 'Home' }];
  if (categories?.data && categories.data.length > 0) {
    categories.data.forEach((category) => {
      links.push({
        href: `/category/${category.slug}/${category.id}`,
        label: category.name,
      });
    });
  }
  links.push({ href: '/about-us', label: 'About Us' });

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
