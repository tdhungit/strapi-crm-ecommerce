import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaUrl(media: any) {
  return process.env.NEXT_PUBLIC_API_URL + media?.url;
}

export function formatNumber(num: number) {
  return num.toLocaleString('en-US');
}

export function formatCurrency(num: number) {
  return '$' + formatNumber(num);
}
