import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.2.122'],
  async redirects() {
    // Platform-level redirects for domain roots. Handled by Vercel's edge
    // routing (not Next.js middleware), so the Location header stays a
    // full absolute URL — middleware redirects to a same-origin path get
    // silently rewritten to a relative Location by Next.js itself, which
    // crawlers like Facebook's scraper fail to follow ("Could Not Follow
    // Redirect").
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'finansewniemczech.de' }],
        destination: 'https://www.finansewniemczech.de/pcf/pl',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'www.finansewniemczech.de' }],
        destination: 'https://www.finansewniemczech.de/pcf/pl',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'tanipradwniemczech.de' }],
        destination: 'https://www.tanipradwniemczech.de/pl',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'www.tanipradwniemczech.de' }],
        destination: 'https://www.tanipradwniemczech.de/pl',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default nextConfig;
