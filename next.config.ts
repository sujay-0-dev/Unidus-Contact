import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/go/whatsapp',
        destination: 'https://wa.me/917003696960',
        permanent: false,
      },
      {
        source: '/go/form',
        destination: 'https://forms.gle/E7VSCKerkjuSVaq7A',
        permanent: false,
      },
      {
        source: '/go/website',
        destination: 'https://unidus.in',
        permanent: false,
      },
      {
        source: '/go/call',
        destination: 'tel:+917003696960',
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
