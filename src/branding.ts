/**
 * App branding: name, logo, and marketing copy.
 * Edit BRAND, AUTH_LEFT_PANEL, and AUTH_MESSAGES to match your product.
 *
 * Alternative name ideas: Nexus, Flowbase, Lumina, Atlas, Rise, Vault, Signal.
 * Swap the logo in components/brand/AppLogo.tsx when you have a final asset.
 */

export const BRAND = {
  name: 'Pulse',
  tagline: "Your team's command center",
} as const;

export const AUTH_LEFT_PANEL = {
  headline: 'Where teams ship faster',
  supporting:
    'Projects, metrics, and goals in one place. Get everyone aligned and moving in the same direction.',
  bullets: [
    'One dashboard for tasks, progress, and reports',
    'Stay in sync without the meeting overload',
    'Built for small teams that think big',
  ],
} as const;

export const AUTH_MESSAGES: Record<'login' | 'register' | 'forgotPassword', string> = {
  login: "Welcome back. Pick up where you left off.",
  register: "Join teams who ship on time. Start free—no credit card.",
  forgotPassword: "We'll get you back in seconds. Enter your email below.",
};
