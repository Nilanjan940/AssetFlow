import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function truncateText(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    AVAILABLE: 'bg-success text-success-foreground',
    ALLOCATED: 'bg-info text-info-foreground',
    UNDER_MAINTENANCE: 'bg-warning text-warning-foreground',
    LOST: 'bg-destructive text-destructive-foreground',
    RETIRED: 'bg-muted text-muted-foreground',
    DISPOSED: 'bg-muted text-muted-foreground',
    RESERVED: 'bg-secondary text-secondary-foreground',
    ACTIVE: 'bg-success text-success-foreground',
    INACTIVE: 'bg-muted text-muted-foreground',
    PENDING: 'bg-warning text-warning-foreground',
    APPROVED: 'bg-success text-success-foreground',
    REJECTED: 'bg-destructive text-destructive-foreground',
    UPCOMING: 'bg-info text-info-foreground',
    ONGOING: 'bg-warning text-warning-foreground',
    COMPLETED: 'bg-success text-success-foreground',
    CANCELLED: 'bg-muted text-muted-foreground',
  };
  return colors[status] || 'bg-muted text-muted-foreground';
}