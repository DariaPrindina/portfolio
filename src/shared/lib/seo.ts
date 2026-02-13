import type { Metadata } from 'next';
import { OG_IMAGE } from '@/shared/config/site';

type BuildMetadataInput = {
  title: string;
  description: string;
  url: string;
  locale?: string;
  imageAlt: string;
};

export function buildPageMetadata({
  title,
  description,
  url,
  locale,
  imageAlt,
}: BuildMetadataInput): Pick<Metadata, 'title' | 'description' | 'openGraph' | 'twitter'> {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      ...(locale ? { locale } : {}),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
