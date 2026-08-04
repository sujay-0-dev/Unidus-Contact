import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/go/'], // Do not index redirect routes
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unidus-contact.vercel.app'}/sitemap.xml`,
  };
}
