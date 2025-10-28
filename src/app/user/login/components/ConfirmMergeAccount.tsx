import { setTokenStore } from '@/app/stores/userSlice';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ApiService from '@/service/ApiService';
import { useDispatch } from 'react-redux';
import { SocialUserType } from '../types';
export default function ConfirmMergeAccount({
  open,
  onOpenChange,
  onSuccess,
  socialUser,
  authService,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  socialUser: SocialUserType;
  authService: string;
}) {
  const dispatch = useDispatch();

  const handleMergeAccount = async () => {
    if (socialUser?.login_provider && socialUser.login_provider_id) {
      let token;
      if (authService === 'firebase') {
        token = socialUser.firebaseToken;
      } else if (authService === 'supabase') {
        token = socialUser.supabaseToken;
      }

      ApiService.request('POST', '/customers/contact/social-merge-to-local', {
        authService,
        login_provider: socialUser.login_provider,
        login_provider_id: socialUser.login_provider_id,
        token,
      })
        .then((res) => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
            dispatch(setTokenStore(res.token));
            onSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Merge Account</DialogTitle>
        </DialogHeader>
        <div className='mb-4'>
          <p>
            You have already registered with same email. Do you want to merge
            your account?
          </p>
        </div>
        <Button onClick={handleMergeAccount} className='w-full'>
          Merge account
        </Button>
      </DialogContent>
    </Dialog>
  );
}
