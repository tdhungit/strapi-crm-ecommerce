'use client';

export const dynamic = 'force-dynamic';

import { setTokenStore } from '@/app/stores/userSlice';
import ApiService from '@/service/ApiService';
import UserService, { RegisterDataType } from '@/service/UserService';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, UserCredential } from 'firebase/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import LoginForm from '../components/LoginForm';
import ConfirmMergeAccount from './components/ConfirmMergeAccount';
import FacebookLogin from './components/FacebookLogin';
import GoogleLogin from './components/GoogleLogin';
import { SocialUserType } from './types';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const [auth, setAuth] = useState<Auth | null>(null);
  const [openMergeAccountDialog, setOpenMergeAccountDialog] = useState(false);
  const [socialUser, setSocialUser] = useState<SocialUserType>({});

  useEffect(() => {
    ApiService.request('GET', '/customers/contact/firebase-config').then(
      (res: any) => {
        const app = initializeApp(res);
        const auth = getAuth(app);
        setAuth(auth);
      }
    );
  }, []);

  const onFirebaseLoginSuccess = async (result: UserCredential) => {
    try {
      const tokenResponse = (result as any)._tokenResponse;
      const registerData: RegisterDataType = {
        login_provider: result.user.providerData[0].providerId,
        login_provider_id: result.user?.uid || '',
        email: result.user?.email || '',
        avatar: result.user?.photoURL || '',
        firstName: tokenResponse?.firstName || '',
        lastName: tokenResponse?.lastName || result.user?.displayName || '',
        phone: '',
        autoLogin: true,
        firebaseToken: tokenResponse.idToken,
      };
      const res = await UserService.register(registerData);

      setSocialUser({
        login_provider: registerData.login_provider,
        login_provider_id: registerData.login_provider_id,
        firebaseToken: registerData.firebaseToken,
      });

      if (res?.token) {
        localStorage.setItem('token', res.token);
        dispatch(setTokenStore(res.token));
        router.push('/');
      } else if (res.code === 'confirm_merge') {
        setOpenMergeAccountDialog(true);
      } else {
        toast.error('Register failed');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Register failed');
    }
  };

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

        {auth && (
          <>
            <div className='mt-1'>
              <GoogleLogin
                auth={auth}
                onLoginSuccess={onFirebaseLoginSuccess}
              />
            </div>
            <div className='mt-1'>
              <FacebookLogin
                auth={auth}
                onLoginSuccess={onFirebaseLoginSuccess}
              />
            </div>
          </>
        )}
      </div>

      <ConfirmMergeAccount
        socialUser={socialUser}
        open={openMergeAccountDialog}
        onOpenChange={setOpenMergeAccountDialog}
        onSuccess={() => {
          router.push('/');
        }}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
