import { type LucideIcon } from "lucide-react";

/**
 * Common interfaces and utilities for component props
 */

// Common action button interface
export interface ActionButton {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary";
  icon?: LucideIcon;
  external?: boolean;
}

// Common stat/metric interface
export interface Stat {
  icon?: LucideIcon;
  value: string;
  label: string;
  description?: string;
}

// Common card item interface
export interface CardItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  badge?: string;
}

// Common feature interface
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  benefits?: string[];
}

// Common timeline item interface
export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
}

// Common FAQ item interface
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Utility functions for common component operations
 */

// Generate consistent IDs for components
export function generateId(prefix: string, title: string): string {
  return `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
}

// Format currency values consistently
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

// Format dates consistently
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Create consistent external link props
export function createExternalLinkProps(href: string) {
  return {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

// Create consistent internal link props
export function createInternalLinkProps(href: string) {
  return {
    href,
  };
}

// Generate aria-label for buttons with icons
export function createAriaLabel(label: string, hasIcon: boolean): string {
  return hasIcon ? `${label} (opens in new tab)` : label;
}

/**
 * Common validation utilities
 */

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate required fields
export function validateRequired(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
