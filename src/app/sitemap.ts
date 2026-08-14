import { MetadataRoute } from 'next';

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

  // We are not exposing dynamic trip URLs to the sitemap because they are generally private or short-lived,
  // and we don't want AI-generated content arbitrarily indexed unless it's a curated destination page.
  // In the future, we can add static /destinations/[slug] pages here.

  return routes;
}
