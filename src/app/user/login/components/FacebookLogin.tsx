'use client';

import { Button } from '@/components/ui/button';
import { Auth, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

export default function FacebookLogin({ auth }: { auth: Auth }) {
  const handleFacebookLogin = async () => {
    if (auth) {
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
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
