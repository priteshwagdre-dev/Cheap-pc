/**
 * Utility functions for currency, discounts, and date formatting
 */

export const formatCurrency = (amount: number): string => {
  if (amount === 0) return 'FREE';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateDiscount = (original: number, current: number): number => {
  if (original <= 0 || current >= original) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};
