const PETAL_COUNT = 8;
const PETAL_RADIUS = 10;
const CENTER = 16;

/** Eight petals orbiting a centre dot — the SasuSync mark. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="#ef4d23" aria-hidden="true">
      {Array.from({ length: PETAL_COUNT }, (_, i) => {
        const angle = (i / PETAL_COUNT) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={CENTER + PETAL_RADIUS * Math.cos(angle)}
            cy={CENTER + PETAL_RADIUS * Math.sin(angle)}
            r={3.5}
          />
        );
      })}
      <circle cx={CENTER} cy={CENTER} r={3.5} />
    </svg>
  );
}
