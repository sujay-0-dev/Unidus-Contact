import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/go/whatsapp',
        destination: 'https://wa.me/910000000000', // Replace with actual number
        permanent: false,
      },
      {
        source: '/go/form',
        destination: 'https://forms.gle/your-form-id', // Replace with actual form URL
        permanent: false,
      },
      {
        source: '/go/website',
        destination: 'https://unidus.in',
        permanent: false,
      },
      {
        source: '/go/call',
        destination: 'tel:+910000000000', // Replace with actual number
        permanent: false,
      },
      {
        source: '/go/email',
        destination: 'mailto:info@unidus.in',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
