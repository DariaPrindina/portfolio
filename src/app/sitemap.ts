import type { MetadataRoute } from 'next';
import { projects } from '@/entities/project/model/projects';
import { SITE_URL } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ru: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ru: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ru: `${SITE_URL}/resume`,
          en: `${SITE_URL}/en/resume`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ru: `${SITE_URL}/resume`,
          en: `${SITE_URL}/en/resume`,
        },
      },
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: project.isCurrent ? 0.95 : 0.75,
    alternates: {
      languages: {
        ru: `${SITE_URL}/projects/${project.slug}`,
        en: `${SITE_URL}/en#projects`,
      },
    },
  }));

  return [...staticPages, ...projectPages];
}
