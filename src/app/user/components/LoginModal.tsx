'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function LoginModal({
  open,
  onOpenChange,
  onSuccess,
}: LoginModalProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center'>
            Sign in to your account
          </DialogTitle>
          <DialogDescription className='text-center'>
            Sign in to access your account and continue shopping
          </DialogDescription>
        </DialogHeader>

        <LoginForm
          onSuccess={handleSuccess}
          showSignUpLink={true}
          showForgotPassword={true}
        />
      </DialogContent>
    </Dialog>
  );
}
