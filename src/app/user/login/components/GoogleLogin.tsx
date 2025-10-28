'use client';

import { Button } from '@/components/ui/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function GoogleLogin({
  authService,
  auth,
  onLoginSuccess,
}: {
  authService: string;
  auth: any;
  onLoginSuccess: (result: any) => Promise<void>;
}) {
  const [checking, setChecking] = useState(false);

  const checkSupabaseSession = async () => {
    const session = await auth.auth.getSession();
    const accessToken = session?.data?.session?.access_token || '';
    if (accessToken) {
      const user = session?.data?.session?.user || {};
      await onLoginSuccess({
        accessToken,
        login_provider: 'google',
        login_provider_id: user.id,
      });
    }
  };

  useEffect(() => {
    if (authService === 'supabase') {
      setChecking(true);
      checkSupabaseSession().then(() => {
        setChecking(false);
      });
    }
  }, [authService]);

  const handleSignIn = async () => {
    if (auth) {
      if (authService === 'firebase') {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          await onLoginSuccess(result);
        } catch (error: any) {
          console.error(error);
          toast.error(error.message || 'Register failed');
        }
      } else if (authService === 'supabase') {
        try {
          await auth.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: window.location.href,
            },
          });
        } catch (error: any) {
          console.error(error);
          toast.error(error.message || 'Register failed');
        }
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <Button onClick={handleSignIn} disabled={checking} className='w-full'>
        Sign in with Google
      </Button>
    </div>
  );
}
