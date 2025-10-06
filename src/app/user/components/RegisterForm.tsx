'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ApiService from '@/service/ApiService';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEmailError('Email is required');
      return;
    }

    ApiService.request('POST', '/customers/contact/check-email', {
      email: e.target.value,
    })
      .then(() => {
        setEmailError('');
      })
      .catch(() => {
        setEmailError('Email already exists');
      });
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      await ApiService.request('POST', '/customers/contact/register', {
        ...formData,
      });

      // Success
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during registration'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>
                First name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='firstName'
                name='firstName'
                type='text'
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder='John'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>
                Last name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='lastName'
                name='lastName'
                type='text'
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Doe'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={formData.email}
              placeholder='name@example.com'
              className={emailError ? 'border-red-500' : ''}
              onChange={handleChange}
              onBlur={handleChangeEmail}
            />
            {emailError && <p className='text-xs text-red-500'>{emailError}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder='123-456-7890'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>
              Password <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='password'
              name='password'
              type='password'
              required
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
            />
            <p className='text-xs text-muted-foreground'>
              Password must be at least 8 characters long
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>
              Confirm Password <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='••••••••'
            />
          </div>
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
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </>
  );
}
