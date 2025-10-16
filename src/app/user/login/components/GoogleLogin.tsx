'use client';

import { Button } from '@/components/ui/button';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { toast } from 'sonner';

export default function GoogleLogin({
  auth,
  onLoginSuccess,
}: {
  auth: Auth;
  onLoginSuccess: (result: UserCredential) => void;
}) {
  const handleSignIn = async () => {
    if (auth) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        await onLoginSuccess(result);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || 'Register failed');
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <Button onClick={handleSignIn} className='w-full'>
        Sign in with Google
      </Button>
    </div>
  );
}
