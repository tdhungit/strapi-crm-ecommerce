'use client';

import { GlobalSettingType } from '@/lib/settings';
import Link from 'next/link';

export default function Footer({
  globalSettings,
}: {
  globalSettings: GlobalSettingType;
}) {
  return (
    <footer className='bg-gray-50 text-gray-900 border-t border-gray-200'>
      <div className='container mx-auto px-4 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-gray-900'>
              Strapi E-Commerce Store
            </h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              {globalSettings.description ||
                'Your trusted partner for quality products and exceptional service.'}
            </p>
            <div className='flex space-x-2'>
              {/* Social Media Icons */}
              {globalSettings.socials &&
                globalSettings.socials.length > 0 &&
                globalSettings.socials?.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.target || '_blank'}
                    title={social.title}
                    className='text-gray-500 hover:text-gray-700 transition-colors'
                    dangerouslySetInnerHTML={{ __html: social.icon }}
                  />
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about-us'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/pages/stores'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Our Stores
                </Link>
              </li>
              <li>
                <Link
                  href='/category'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>
              Customer Service
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/pages/contact'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href='/pages/shipping'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href='/pages/returns'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href='/pages/faq'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>
              Legal & Contact
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/privacy'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href='mailto:support@yourstore.com'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  support@yourstore.com
                </a>
              </li>
              <li>
                <a
                  href='tel:+1234567890'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className='border-t border-gray-300 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-center md:text-left'>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                Stay Updated
              </h4>
              <p className='text-gray-600 text-sm'>
                Subscribe to our newsletter for the latest updates and offers.
              </p>
            </div>
            <div className='flex w-full md:w-auto max-w-md'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
              <button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors font-medium border border-l-0 border-blue-600'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-300 mt-8 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-gray-600 text-sm text-center md:text-left'>
              {globalSettings.footer ||
                '© 2025 Strapi CRM & E-Commerce. All rights reserved.'}
            </div>
            <div className='flex space-x-6'>
              <span className='text-gray-600 text-sm'>Secure Payment</span>
              <div className='flex space-x-2'>
                {/* Payment Icons */}
                <div className='w-8 h-5 bg-gray-200 rounded flex items-center justify-center border border-gray-300'>
                  <span className='text-xs text-gray-600'>💳</span>
                </div>
                <div className='w-8 h-5 bg-gray-200 rounded flex items-center justify-center border border-gray-300'>
                  <span className='text-xs text-gray-600'>🏦</span>
                </div>
                <div className='w-8 h-5 bg-gray-200 rounded flex items-center justify-center border border-gray-300'>
                  <span className='text-xs text-gray-600'>📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
