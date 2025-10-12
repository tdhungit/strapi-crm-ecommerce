'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className,
}: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100',
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
}
