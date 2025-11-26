import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaUrl(media: any) {
  if (!media?.url) {
    return 'https://placehold.co/64x64/jpg';
  }
  if (media?.url?.startsWith('http')) {
    return media?.url;
  }
  return process.env.NEXT_PUBLIC_API_URL + media?.url;
}

export function formatNumber(num: number) {
  if (!num) return 0;
  return num.toLocaleString('en-US');
}

export function formatCurrency(num: number) {
  if (!num) return '$0';
  return '$' + formatNumber(num);
}

export function formatDate(date: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US');
}
