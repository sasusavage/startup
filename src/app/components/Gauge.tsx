type GaugeProps = {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
};

const TICK_COUNT = 40;
const CENTER = 100;
const RADIUS = 80;
const TICK_LENGTH = 10;

export default function Gauge({
  value,
  color = '#ef4d23',
  showLabels = false,
  min,
  max,
}: GaugeProps) {
  const activeCount = Math.round((value / 100) * TICK_COUNT);

  return (
    <div className="gauge">
      <svg className="gauge-svg" viewBox="0 0 200 120" role="img" aria-label={`${value}%`}>
        {Array.from({ length: TICK_COUNT }, (_, i) => {
          // Sweep a 180° arc: π (left) → 2π (right), which traces the upper half.
          const angle = Math.PI + (i / (TICK_COUNT - 1)) * Math.PI;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const inner = RADIUS - TICK_LENGTH;

          return (
            <line
              key={i}
              x1={CENTER + inner * cos}
              y1={CENTER + inner * sin}
              x2={CENTER + RADIUS * cos}
              y2={CENTER + RADIUS * sin}
              stroke={i < activeCount ? color : '#d4d4d8'}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          );
        })}

        <text x={CENTER} y={105} textAnchor="middle" fontSize={22} fontWeight={600} fill="#0b0f1a">
          {value}%
        </text>
      </svg>

      {showLabels && (
        <div className="gauge-labels">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
