import Link from 'next/link';
import { getGithubStats } from '@/shared/lib/github';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default async function GithubStats({ locale = 'ru' }: { locale?: Locale }) {
  const { github } = getContent(locale);
  const stats = await getGithubStats('DariaPrindina');
  const numberFormatter = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'ru-RU');

  return (
    <section id={SECTION_IDS.github} className="section">
      <p className="section__label">{github.label}</p>
      <h2 className="section__title">
        {github.title}
      </h2>

      {!stats ? (
        <p className="github__fallback">
          {github.fallback}
        </p>
      ) : (
        <>
          <div className="github__kpi">
            <article className="github__kpi-item">
              <p className="github__kpi-label">{github.repos}</p>
              <p className="github__kpi-value">{numberFormatter.format(stats.publicRepos)}</p>
            </article>
            <article className="github__kpi-item">
              <p className="github__kpi-label">{github.followers}</p>
              <p className="github__kpi-value">{numberFormatter.format(stats.followers)}</p>
            </article>
            <article className="github__kpi-item">
              <p className="github__kpi-label">{github.stars}</p>
              <p className="github__kpi-value">{numberFormatter.format(stats.totalStars)}</p>
            </article>
          </div>

          <div className="github__repos">
            {stats.topRepos.map((repo) => (
              <Link
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github__repo-link"
              >
                {repo.name}
                <span>
                  ★ {repo.stars} · {github.forks} {repo.forks}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
