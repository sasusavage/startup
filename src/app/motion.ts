/** Shared easing — a soft decelerating curve used by every transition. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade up from below. Used for hero entrances and scroll reveals alike. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** Parent variant that walks its children in one after another. */
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};
