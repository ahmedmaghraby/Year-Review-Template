import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge multiple class values while properly handling Tailwind CSS classes
 * Combines clsx for conditional classes with twMerge to handle Tailwind overrides
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
