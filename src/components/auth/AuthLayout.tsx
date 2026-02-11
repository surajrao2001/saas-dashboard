import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLogo } from '../brand/AppLogo';
import { BRAND, AUTH_LEFT_PANEL } from '../../branding';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  brandMessage?: string;
}

const STORY_ICONS = [
  {
    label: 'Plan',
    title: 'Plan your work',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden>
        <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9" />
        <path d="M20 20h24M20 28h18M20 36h14M20 44h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="44" cy="44" r="8" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: 'Sync',
    title: 'Stay in sync',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden>
        <path d="M20 32a16 16 0 0128-8l4-4M44 32a16 16 0 01-28 8l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: 'Ship',
    title: 'Ship faster',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden>
        <path d="M16 44L32 28l16 16-16 16L16 44z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9" />
        <path d="M32 28v24M24 36l16-16M40 36L24 52" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="32" cy="44" r="5" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
] as const;

function AuthStoryIcons() {
  return (
    <div className="flex items-end justify-center gap-6 md:gap-8 lg:gap-10">
      {STORY_ICONS.map((item, i) => (
        <figure key={i} className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white/90 flex items-center justify-center shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" title={item.title}>
            {item.svg}
          </div>
          <figcaption className="text-sm md:text-base font-medium text-white/80 text-center">
            {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function AuthLayout({ children, title, subtitle, brandMessage }: AuthLayoutProps) {
  return (
    <div className="auth-root min-h-screen min-w-0 flex flex-col md:flex-row bg-surface overflow-x-hidden">
      <motion.aside
        className="relative hidden md:flex md:w-1/2 lg:w-[55%] flex-col justify-between auth-brand-gradient overflow-hidden shrink-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute inset-0 auth-noise" aria-hidden />
        <header className="relative z-10 shrink-0 p-6 md:p-8 lg:p-10 xl:p-12">
          <Link
            to="/"
            className="inline-flex origin-left items-center gap-2 text-white/95 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 rounded lg:scale-110 xl:scale-125 2xl:scale-[1.35]"
          >
            <AppLogo variant="full" className="text-white" />
          </Link>
        </header>
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-[min(95%,72rem)] mx-auto px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pb-16 lg:pb-20 text-white">
          <motion.div
            className="text-left w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-[54rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {brandMessage && (
              <p className="text-base lg:text-lg xl:text-xl font-medium text-white/85 mb-4 lg:mb-5 xl:mb-6">
                {brandMessage}
              </p>
            )}
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-semibold text-white/95 mb-3 lg:mb-4 xl:mb-5">
              {AUTH_LEFT_PANEL.headline}
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed mb-6 lg:mb-8 xl:mb-10">
              {AUTH_LEFT_PANEL.supporting}
            </p>
            <ul className="space-y-2 lg:space-y-3 text-sm md:text-base lg:text-lg xl:text-xl text-white/75">
              {AUTH_LEFT_PANEL.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2 lg:gap-3">
                  <span className="text-white/90 mt-0.5 lg:mt-1 shrink-0 text-base lg:text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="mt-8 lg:mt-12 xl:mt-14 2xl:mt-16 flex flex-col items-center gap-3 text-white/80 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <AuthStoryIcons />
          </motion.div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col justify-center items-center min-w-0 px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          className="w-full max-w-[420px] flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <header className="md:hidden mb-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center tap-target text-lg font-semibold text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              <AppLogo variant="full" />
            </Link>
          </header>
          <section className="w-full flex flex-col items-center text-center mb-8">
            <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl mb-2">{title}</h1>
            {subtitle && <p className="text-sm text-text-muted max-w-[360px]">{subtitle}</p>}
          </section>
          <div className="w-full">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
