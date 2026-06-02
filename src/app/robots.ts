import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/_not-found',
    },
    sitemap: 'https://numb.design/sitemap.xml',
  };
}
