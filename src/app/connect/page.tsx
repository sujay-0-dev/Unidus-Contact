import { Metadata } from 'next';
import ConnectClientPage from './ConnectClientPage';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unidus-contact.vercel.app';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'UNIDUS';

  const title = `${companyName} | Integrated Solutions & Services`;
  const description = 'Transform your business with complete Software, Hardware, AI, Automation, Security, Building Management, Smart Home, Networking and Integrated Technology Solutions.';
  const keywords = [
    'UNIDUS',
    'Software Development',
    'Hardware Solutions',
    'Automation',
    'IoT',
    'Building Management',
    'Security Systems',
    'AI',
    'Embedded Systems',
    'Networking',
    'Cloud',
    'Enterprise Solutions'
  ].join(', ');

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: '/connect',
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/connect`,
      siteName: companyName,
      images: [
        {
          url: '/connect/opengraph-image', // Served dynamically by opengraph-image.tsx
          width: 1200,
          height: 630,
          alt: `${companyName} - Integrated Solutions & Services`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/connect/opengraph-image'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ConnectPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unidus.co.in';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'UNIDUS';
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+917003696960';
  
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    url: siteUrl,
    logo: 'https://unidus.co.in/assets/logo2.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/unidus',
      'https://www.linkedin.com/company/unidus',
      'https://twitter.com/unidus'
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyName,
    url: siteUrl,
  };

  // WebPage Schema
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${companyName} | Connect`,
    url: `${siteUrl}/connect`,
    description: 'Transform your business with complete Software, Hardware, AI, Automation, Security, Building Management, Smart Home, Networking and Integrated Technology Solutions.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <ConnectClientPage />
    </>
  );
}
