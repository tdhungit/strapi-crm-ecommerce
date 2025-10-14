'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import GoogleLogin from './components/GoogleLogin';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden flex items-center justify-center'>
      <div className='max-w-md w-full bg-card p-8 rounded-lg shadow-md my-10'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-sm text-muted-foreground'>
            Or{' '}
            <Link
              href='/user/register'
              className='font-medium text-primary hover:underline'
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className='mt-8'>
          <LoginForm
            onSuccess={() => router.push(returnTo || '/')}
            showSignUpLink={false}
            showForgotPassword={true}
          />
        </div>

        <div className='mt-1'>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
