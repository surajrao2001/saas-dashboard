import { BRAND } from '../../branding';

type AppLogoVariant = 'wordmark' | 'icon' | 'full';

interface AppLogoProps {
  variant?: AppLogoVariant;
  className?: string;
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 16h3l2-6 2 12 2-6h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  );
}

export function AppLogo({ variant = 'full', className = '' }: AppLogoProps) {
  const baseClass = 'inline-flex items-center gap-2 font-semibold tracking-tight';

  if (variant === 'icon') {
    return <LogoIcon className={className || 'w-8 h-8'} />;
  }

  if (variant === 'wordmark') {
    return <span className={`${baseClass} ${className}`}>{BRAND.name}</span>;
  }

  return (
    <span className={`${baseClass} ${className}`}>
      <LogoIcon className="w-7 h-7 shrink-0" />
      {BRAND.name}
    </span>
  );
}
