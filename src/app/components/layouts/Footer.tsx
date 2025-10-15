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
              Your trusted partner for quality products and exceptional service.
              We're committed to delivering the best shopping experience.
            </p>
            <div className='flex space-x-4'>
              {/* Social Media Icons */}
              <a
                href='#'
                className='text-gray-500 hover:text-gray-700 transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-500 hover:text-gray-700 transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-500 hover:text-gray-700 transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z' />
                </svg>
              </a>
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
                  href='/stores'
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
                  href='/contact'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href='/shipping'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href='/returns'
                  className='text-gray-600 hover:text-gray-900 transition-colors text-sm'
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
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
