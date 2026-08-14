import { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travorai.in';

  // Public pages
  const routes = ['', '/onboarding', '/flights', '/stays', '/inspiration'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  // Programmatic SEO Destination Pages
  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...destinationRoutes];
}
