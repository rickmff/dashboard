import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency with the specified locale and currency code
 * @param value The number to format
 * @param locale The locale to use for formatting (defaults to 'en-US')
 * @param currency The currency code to use (defaults to 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value)
}
