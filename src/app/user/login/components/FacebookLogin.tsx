'use client';

import { Button } from '@/components/ui/button';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
export default function FacebookLogin({
  authService,
  auth,
  onLoginSuccess,
}: {
  authService: string;
  auth: any;
  onLoginSuccess: (result: any) => Promise<void>;
}) {
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (authService === 'supabase') {
      setChecking(true);
      checkSupabaseSession().then(() => {
        setChecking(false);
      });
    }
  }, [authService]);

  const checkSupabaseSession = async () => {
    const session = await auth.auth.getSession();
    const accessToken = session?.data?.session?.access_token || '';
    if (accessToken) {
      const user = session?.data?.session?.user || {};
      await onLoginSuccess({
        accessToken,
        login_provider: 'facebook',
        login_provider_id: user.id,
      });
    }
  };

  const handleFacebookLogin = async () => {
    if (auth) {
      if (authService === 'firebase') {
        const provider = new FacebookAuthProvider();
        provider.addScope('public_profile');
        provider.addScope('email');
        try {
          const result = await signInWithPopup(auth, provider);
          await onLoginSuccess(result);
        } catch (error) {
          console.error(error);
        }
      } else if (authService === 'supabase') {
        try {
          await auth.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
              redirectTo: window.location.href,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <Button
        onClick={handleFacebookLogin}
        disabled={checking}
        className='w-full'
      >
        Facebook Login
      </Button>
    </div>
  );
}
