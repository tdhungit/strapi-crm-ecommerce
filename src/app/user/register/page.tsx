'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  const router = useRouter();

  return (
    <div className='bg-white/50 rounded-xl py-7 px-8 overflow-hidden flex items-center justify-center'>
      <div className='max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-md my-10'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Create an account
          </h2>
          <p className='mt-2 text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/user/login'
              className='font-medium text-primary hover:underline'
            >
              Sign in
            </Link>
          </p>
        </div>

        <RegisterForm onSuccess={() => router.push('/user/login')} />

        <p className='px-8 text-center text-sm text-muted-foreground'>
          By clicking continue, you agree to our{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
