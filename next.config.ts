import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // GitHub Pages отдаёт только статику, поэтому сайт целиком
  // собирается в папку out/ на этапе билда.
  output: 'export',
  images: {
    // Оптимизатору картинок нужен работающий сервер Next, а его больше нет.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
};

export default nextConfig;
