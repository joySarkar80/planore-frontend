import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const fmt = (d: string, type: 'date' | 'time') => {
  const dt = new Date(d);
  return type === 'date'
    ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};