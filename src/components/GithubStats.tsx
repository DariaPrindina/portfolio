import Link from 'next/link';
import { getGithubStats } from '@/lib/github';

const numberFormatter = new Intl.NumberFormat('ru-RU');

export default async function GithubStats() {
  const stats = await getGithubStats('DariaPrindina');

  return (
    <section id="github" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        GitHub и REST API
      </h2>
      <p className="about__intro" data-reveal="up">
        Этот блок загружается из GitHub API в реальном времени через типизированный data-layer.
      </p>

      {!stats ? (
        <p className="github__fallback" data-reveal="up">
          Не удалось загрузить данные GitHub API сейчас. Попробуйте обновить страницу позже.
        </p>
      ) : (
        <>
          <div className="github__kpi-grid">
            <article className="github__kpi" data-reveal="up">
              <p>Public repos</p>
              <strong>{numberFormatter.format(stats.publicRepos)}</strong>
            </article>
            <article className="github__kpi" data-reveal="up">
              <p>Followers</p>
              <strong>{numberFormatter.format(stats.followers)}</strong>
            </article>
            <article className="github__kpi" data-reveal="up">
              <p>Total stars</p>
              <strong>{numberFormatter.format(stats.totalStars)}</strong>
            </article>
          </div>

          <div className="github__repos" data-reveal="up">
            {stats.topRepos.map((repo) => (
              <Link
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github__repo-link"
              >
                <strong>{repo.name}</strong>
                <span>
                  ⭐ {repo.stars} · Forks {repo.forks}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
