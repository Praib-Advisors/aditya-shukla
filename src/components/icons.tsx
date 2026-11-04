type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.8 3h3l-6.6 7.5L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2.3 3h6.2l4.3 5.7zm-1.1 16.2h1.7L7.6 4.7H5.8z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4.5 9.2h3.3V20H4.5zM6.1 4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM9.8 9.2h3.1v1.5c.5-.9 1.600-1.800 3.300-1.800 3.400 0 4 2.200 4 5.100V20h-3.300v-5.200c0-1.200 0-2.800-1.700-2.800s-2 1.300-2 2.700V20H9.800z" />
    </svg>
  );
}

export const socialIcons = { facebook: FacebookIcon, x: XIcon, instagram: InstagramIcon, linkedin: LinkedinIcon } as const;

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 7H5v6h4v4H5M19 7h-4v6h4v4h-4" />
    </svg>
  );
}
