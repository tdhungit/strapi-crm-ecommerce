'use client';

import { setTokenStore } from '@/app/stores/userSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ApiService from '@/service/ApiService';
import UserService, { RegisterDataType } from '@/service/UserService';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

interface SocialUserType {
  login_provider?: string;
  login_provider_id?: string;
  firebaseToken?: string;
}

export default function GoogleLogin({ auth }: { auth: Auth }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openMergeAccountDialog, setOpenMergeAccountDialog] = useState(false);
  const [socialUser, setSocialUser] = useState<SocialUserType>({});

  const handleSignIn = async () => {
    if (auth) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const tokenResponse = (result as any)._tokenResponse;
        const registerData: RegisterDataType = {
          login_provider: 'google',
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
    }
  };

  const handleMergeAccount = async () => {
    if (
      socialUser?.login_provider &&
      socialUser.login_provider_id &&
      socialUser.firebaseToken
    ) {
      ApiService.request('POST', '/customers/contact/social-merge-to-local', {
        login_provider: socialUser.login_provider,
        login_provider_id: socialUser.login_provider_id,
        firebaseToken: socialUser.firebaseToken,
      }).then((res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          dispatch(setTokenStore(res.token));
          router.push('/');
        }
      });
    }
  };

  return (
    <div className='flex justify-center'>
      <Button onClick={handleSignIn} className='w-full'>
        Sign in with Google
      </Button>

      <Dialog
        open={openMergeAccountDialog}
        onOpenChange={setOpenMergeAccountDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <div className='mb-4'>
            <p>
              You have already registered with same email. Do you want to merge
              your account?
            </p>
          </div>
          <Button onClick={handleMergeAccount}>Merge account</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
