'use client';

import { Button } from '@/components/ui/button';
import {
  Auth,
  FacebookAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
export default function FacebookLogin({
  auth,
  onLoginSuccess,
}: {
  auth: Auth;
  onLoginSuccess: (result: UserCredential) => void;
}) {
  const handleFacebookLogin = async () => {
    if (auth) {
      const provider = new FacebookAuthProvider();
      provider.addScope('public_profile');
      provider.addScope('email');
      try {
        const result = await signInWithPopup(auth, provider);
        await onLoginSuccess(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <Button onClick={handleFacebookLogin} className='w-full'>
        Facebook Login
      </Button>
    </div>
  );
}
