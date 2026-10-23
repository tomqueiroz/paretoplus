import { Variants, Transition } from 'framer-motion';

// ─── Spring Presets ──────────────────────────────────────────────────────────
export const springPresets = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as Transition,
  gentle: { type: 'spring', stiffness: 300, damping: 35 } as Transition,
  bouncy: { type: 'spring', stiffness: 500, damping: 25 } as Transition,
  smooth: { type: 'spring', stiffness: 200, damping: 40 } as Transition,
  inertia: { type: 'spring', stiffness: 150, damping: 20 } as Transition,
};

// ─── Common Variants ─────────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springPresets.gentle },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springPresets.gentle },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springPresets.gentle },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springPresets.gentle },
  },
};

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: '0 0 0px transparent' },
  hover: {
    y: -4,
    boxShadow: '0 20px 60px -10px rgba(136, 0, 255, 0.4)',
    transition: { ...springPresets.snappy },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springPresets.gentle },
  },
};
