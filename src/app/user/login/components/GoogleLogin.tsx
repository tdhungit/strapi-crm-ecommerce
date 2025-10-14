import { Button } from '@/components/ui/button';
import ApiService from '@/service/ApiService';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function GoogleLogin() {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    ApiService.request('GET', '/customers/contact/firebase-config').then(
      (res: any) => {
        const app = initializeApp(res);
        const auth = getAuth(app);
        setAuth(auth);
      }
    );
  }, []);

  const handleSignIn = async () => {
    if (auth) {
      const provider = new GoogleAuthProvider();
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
      <Button onClick={handleSignIn} className='w-full'>
        Sign in with Google
      </Button>
    </div>
  );
}
