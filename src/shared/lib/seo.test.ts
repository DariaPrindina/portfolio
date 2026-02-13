import { describe, expect, it } from 'vitest';
import { OG_IMAGE } from '@/shared/config/site';
import { buildPageMetadata } from '@/shared/lib/seo';

describe('buildPageMetadata', () => {
  it('builds metadata with Open Graph and Twitter image', () => {
    const metadata = buildPageMetadata({
      title: 'Test title',
      description: 'Test description',
      url: '/test',
      imageAlt: 'Test alt',
    });

    expect(metadata.title).toBe('Test title');
    expect(metadata.description).toBe('Test description');
    const ogImages = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : [metadata.openGraph?.images].filter(Boolean);
    const twitterImages = Array.isArray(metadata.twitter?.images)
      ? metadata.twitter.images
      : [metadata.twitter?.images].filter(Boolean);

    expect(ogImages[0]).toMatchObject({
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      alt: 'Test alt',
    });
    expect(twitterImages[0]).toBe(OG_IMAGE);
  });
});
