import type { ReactNode } from 'react';

type Props = {
  slug: string;
};

function CrmVisitCardPreview() {
  return (
    <div className="preview-shell preview-shell--crm">
      <div className="preview-crm__header">Расписание мастера</div>
      <div className="preview-crm__list">
        <div className="preview-crm__item preview-crm__item--new">
          <span>10:30</span>
          <strong>Анна Петрова</strong>
          <small>new</small>
        </div>
        <div className="preview-crm__item preview-crm__item--confirmed">
          <span>12:00</span>
          <strong>Мария Иванова</strong>
          <small>confirmed</small>
        </div>
      </div>
    </div>
  );
}

function InfoSectionPreview() {
  return (
    <div className="preview-shell preview-shell--site">
      <h4>О центре</h4>
      <p>Поддержка, развитие и адаптация детей и взрослых.</p>
      <button>Связаться</button>
    </div>
  );
}

function CurrencyPreview() {
  return (
    <div className="preview-shell preview-shell--currency">
      <div className="preview-currency__row">
        <span>Amount</span>
        <strong>120.00</strong>
      </div>
      <div className="preview-currency__row">
        <span>Rate</span>
        <strong>89.51</strong>
      </div>
      <div className="preview-currency__result">Result: 10 741.20</div>
    </div>
  );
}

function TestPreview() {
  return (
    <div className="preview-shell preview-shell--test">
      <div className="preview-test__line" />
      <div className="preview-test__line preview-test__line--short" />
      <div className="preview-test__chip">PASS</div>
    </div>
  );
}

export default function ProjectVisualPreview({ slug }: Props) {
  const map: Record<string, ReactNode> = {
    'arbat-beauty-crm': <CrmVisitCardPreview />,
    'izumrudny-gorod-site': <InfoSectionPreview />,
    'currency-converter': <CurrencyPreview />,
    'procharity-platform': <TestPreview />,
  };

  return map[slug] ?? <div className="preview-shell">Preview</div>;
}
