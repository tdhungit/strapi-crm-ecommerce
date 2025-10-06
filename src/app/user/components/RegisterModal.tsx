'use client';

import { setTokenStore } from '@/app/stores/userSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDispatch } from 'react-redux';
import RegisterForm from './RegisterForm';

export default function RegisterModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (contact: { token: string; [key: string]: any }) => void;
}) {
  const dispatch = useDispatch();

  const handleSuccess = (contact: { token: string; [key: string]: any }) => {
    if (contact.token) {
      localStorage.setItem('token', contact.token);
      dispatch(setTokenStore(contact.token));
    }
    onSuccess?.(contact);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <div>
          <RegisterForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
