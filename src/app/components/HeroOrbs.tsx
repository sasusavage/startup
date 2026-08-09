/**
 * Soft brand-orange blooms drifting behind the hero type. Pure CSS so it
 * costs nothing at runtime, and it stops dead under prefers-reduced-motion.
 */
const ORBS = ['orb-a', 'orb-b', 'orb-c', 'orb-d'];

export default function HeroOrbs() {
  return (
    <div className="orbs" aria-hidden="true">
      {ORBS.map((orb) => (
        <span className={`orb ${orb}`} key={orb} />
      ))}
    </div>
  );
}
