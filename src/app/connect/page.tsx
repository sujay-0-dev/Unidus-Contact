import type { Metadata } from 'next';
import ConnectClientPage from './ConnectClientPage';

export const metadata: Metadata = {
  title: 'UNIDUS | Software & Hardware Solutions',
  description: 'Transforming Ideas into Reality with Software & Hardware Solutions.',
  alternates: {
    canonical: 'https://unidus.in/connect',
  },
  openGraph: {
    title: 'UNIDUS | Software & Hardware Solutions',
    description: 'Transforming Ideas into Reality with Software & Hardware Solutions.',
    url: 'https://unidus.in/connect',
    siteName: 'UNIDUS',
    images: [
      {
        url: '/images/connect-og.jpg',
        width: 1200,
        height: 630,
        alt: 'UNIDUS Connect Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNIDUS | Software & Hardware Solutions',
    description: 'Transforming Ideas into Reality with Software & Hardware Solutions.',
    images: ['/images/connect-og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UNIDUS',
  url: 'https://unidus.in',
  logo: 'https://unidus.in/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-0000000000',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.facebook.com/unidus',
    'https://www.instagram.com/unidus',
    'https://www.linkedin.com/company/unidus',
  ],
};

export default function ConnectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConnectClientPage />
    </>
  );
}
