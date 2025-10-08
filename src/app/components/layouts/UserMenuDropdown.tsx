'use client';

import { setTokenStore } from '@/app/stores/userSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserService from '@/service/UserService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function UserMenuDropdown({ user }: { user: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserName = () => {
    if (user) {
      if (user.firstName || user.lastName) {
        return `${user.firstName} ${user.lastName}`.trim();
      }
      return user.email;
    }
    return 'Guest';
  };

  const handleLogout = () => {
    UserService.logout();
    dispatch(setTokenStore(''));
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className='text-gray-500 cursor-pointer'>{getUserName()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/user/my-account')}>
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
