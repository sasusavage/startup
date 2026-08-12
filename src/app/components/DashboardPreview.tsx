import { useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

import Gauge from './Gauge';
import { useQuote } from '../QuoteContext';

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
  /** Shown when the second toggle option is selected. */
  gaugeAlt: number;
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
    gaugeAlt: 78,
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
    gaugeAlt: 41,
    gaugeColor: '#9ca3af',
    toggle: ['Response', 'Incidents'],
  },
];

function ServiceCard({ data }: { data: ServicePreview }) {
  const [active, setActive] = useState(0);
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
        value={active === 0 ? data.gauge : data.gaugeAlt}
        color={data.gaugeColor}
        showLabels={Boolean(data.gaugeMin)}
        min={data.gaugeMin}
        max={data.gaugeMax}
      />

      <div className="toggle" role="group">
        {data.toggle.map((option, i) => (
          <button
            type="button"
            key={option}
            className={i === active ? 'toggle-option toggle-option-active' : 'toggle-option'}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {option}
          </button>
        ))}
      </div>
    </article>
  );
}

const PROJECT_TYPES = ['A website', 'A web app', 'A SaaS product', 'An AI integration', 'An API'];
const TIMELINES = ['This month', 'Next month', 'This quarter', 'Still exploring'];

function QuoteCard() {
  const { setPrefill } = useQuote();
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [pages, setPages] = useState('10');
  const [integrations, setIntegrations] = useState('3');

  function requestQuote() {
    setPrefill(
      [
        `Project: ${type}`,
        `Timeline: ${timeline}`,
        `Pages: ${pages}`,
        `Integrations: ${integrations}`,
        '',
        '',
      ].join('\n'),
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <article className="card card-form">
      <label className="field">
        <span className="field-label">What do you need</span>
        <select
          className="field-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {PROJECT_TYPES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">When do we start</span>
        <select
          className="field-select"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          {TIMELINES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Pages</span>
        <span className="field-input">
          <span className="field-prefix">#</span>
          <input
            type="number"
            min="1"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            aria-label="Number of pages"
          />
        </span>
      </label>

      <label className="field">
        <span className="field-label">Integrations</span>
        <span className="field-input">
          <span className="field-prefix">#</span>
          <input
            type="number"
            min="0"
            value={integrations}
            onChange={(e) => setIntegrations(e.target.value)}
            aria-label="Number of integrations"
          />
        </span>
      </label>

      <footer className="card-form-footer">
        <button type="button" className="btn-save" onClick={requestQuote}>
          Request quote
        </button>
        <a className="btn-cancel" href="#services">
          See services
        </a>
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
