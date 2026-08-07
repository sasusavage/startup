import { ChevronDown, TrendingDown, TrendingUp, X } from 'lucide-react';

import Gauge from './Gauge';

/**
 * Placeholder previews for the subdomain services. The admin dashboard will
 * eventually feed these from the backend — one entry per registered subdomain.
 */
export type ServicePreview = {
  title: string;
  period: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  caption: string;
  gaugeLabel?: string;
  gauge: number;
  gaugeColor?: string;
  gaugeMin?: string;
  gaugeMax?: string;
  toggle: [string, string];
};

export const SERVICE_PREVIEWS: ServicePreview[] = [
  {
    title: 'Messages',
    period: 'This month',
    value: '6,896',
    delta: '-3,382 (33%)',
    trend: 'down',
    caption: 'Compared to yesterday',
    gaugeLabel: 'Month target achieved',
    gauge: 92,
    gaugeMin: '389K',
    gaugeMax: '425K',
    toggle: ['Delivered', 'Sent'],
  },
  {
    title: 'Incidents',
    period: 'today',
    value: '0',
    delta: '0',
    trend: 'up',
    caption: 'Compared to yesterday',
    gauge: 68,
    gaugeColor: '#9ca3af',
    toggle: ['Response', 'Incidents'],
  },
];

function ServiceCard({ data }: { data: ServicePreview }) {
  const TrendIcon = data.trend === 'down' ? TrendingDown : TrendingUp;

  return (
    <article className="card">
      <header className="card-head">
        <span className="card-title">{data.title}</span>
        <span className="card-period">{data.period}</span>
      </header>

      <div className="card-metric">
        <span className="card-value">{data.value}</span>
        <span className={data.trend === 'down' ? 'card-pill card-pill-down' : 'card-pill'}>
          <TrendIcon size={12} strokeWidth={2.5} />
          {data.delta}
        </span>
      </div>

      <p className="card-caption">{data.caption}</p>

      {data.gaugeLabel && <p className="card-gauge-label">{data.gaugeLabel}</p>}

      <Gauge
        value={data.gauge}
        color={data.gaugeColor}
        showLabels={Boolean(data.gaugeMin)}
        min={data.gaugeMin}
        max={data.gaugeMax}
      />

      <div className="toggle">
        <span className="toggle-option toggle-option-active">{data.toggle[0]}</span>
        <span className="toggle-option">{data.toggle[1]}</span>
      </div>
    </article>
  );
}

function QuoteCard() {
  return (
    <article className="card card-form">
      <label className="field">
        <span className="field-label">What do you need</span>
        <button type="button" className="field-select">
          A website
          <ChevronDown size={14} strokeWidth={2} />
        </button>
      </label>

      <label className="field">
        <span className="field-label">When do we start</span>
        <button type="button" className="field-select">
          This month
          <ChevronDown size={14} strokeWidth={2} />
        </button>
      </label>

      <label className="field">
        <span className="field-label">Pages</span>
        <span className="field-input">
          <span className="field-prefix">#</span>
          10
        </span>
      </label>

      <label className="field">
        <span className="field-label">Integrations</span>
        <span className="field-input">
          <span className="field-prefix">#</span>
          3
        </span>
      </label>

      <footer className="card-form-footer">
        <span className="btn-save">Request quote</span>
        <span className="btn-cancel">Cancel</span>
        <X size={16} strokeWidth={2} className="card-form-close" />
      </footer>
    </article>
  );
}

export default function DashboardPreview() {
  const [first, second] = SERVICE_PREVIEWS;

  return (
    <div className="dashboard-outer">
      <div className="dashboard-tray">
        <div className="dashboard-grid">
          <ServiceCard data={first} />
          <QuoteCard />
          <ServiceCard data={second} />
        </div>
      </div>
    </div>
  );
}
