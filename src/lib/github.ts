export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

export type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

export type GithubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topRepos: Array<{
    name: string;
    url: string;
    stars: number;
    forks: number;
    updatedAt: string;
  }>;
};

export async function getGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 60 * 60 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        next: { revalidate: 60 * 60 },
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return null;
    }

    const user = (await userResponse.json()) as GithubUser;
    const repos = (await reposResponse.json()) as GithubRepo[];

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    const topRepos = [...repos]
      .sort((a, b) => {
        const scoreA = a.stargazers_count * 3 + a.forks_count;
        const scoreB = b.stargazers_count * 3 + b.forks_count;
        return scoreB - scoreA;
      })
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }));

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topRepos,
    };
  } catch {
    return null;
  }
}
