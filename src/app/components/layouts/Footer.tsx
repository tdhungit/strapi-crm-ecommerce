'use client';

import { GlobalSettingType } from '@/lib/settings';

export default function Footer({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
  return (
    <footer className='bg-white/50'>
      <div className='container mx-auto flex justify-center items-center py-4'>
        <div>
          {globalSettings.footer ||
            '&copy; 2025 Strapi CRM & E-Commerce. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
