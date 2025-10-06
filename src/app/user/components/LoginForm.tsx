'use client';

import { setTokenStore } from '@/app/stores/userSlice';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ApiService from '@/service/ApiService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function LoginForm({
  onSuccess,
  showSignUpLink,
  showForgotPassword,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
  showSignUpLink?: boolean;
  showForgotPassword?: boolean;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);

      const res = await ApiService.request('POST', '/customers/contact/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.jwt);
      dispatch(setTokenStore(res.jwt));

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@example.com'
            />
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
              <Link
                href='/user/forgot-password'
                className='text-sm font-medium text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember-me'
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor='remember-me'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Remember me
            </label>
          </div>
          {showSignUpLink && (
            <div className=''>
              <Link
                href='/user/register'
                className='text-sm font-medium text-primary hover:underline'
              >
                Don't have an account? Sign up
              </Link>
            </div>
          )}
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </>
  );
}
