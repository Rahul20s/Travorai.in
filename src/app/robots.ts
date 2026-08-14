import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'], // Protect private authenticated routes and APIs
    },
    sitemap: 'https://travorai.in/sitemap.xml',
  };
}
