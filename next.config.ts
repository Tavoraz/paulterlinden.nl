import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "paulterlinden.nl",
      },
      {
        protocol: "https",
        hostname: "unavatar.io",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/advies/:path*",
        destination: "/wat#bestuursadvies",
        permanent: true,
      },
      {
        source: "/coaching/:path*",
        destination: "/wat#coaching",
        permanent: true,
      },
      {
        source: "/begeleiding/:path*",
        destination: "/wat#teambegeleiding",
        permanent: true,
      },
      {
        source: "/aanpak/:path*",
        destination: "/hoe",
        permanent: true,
      },
      {
        source: "/over-paul/:path*",
        destination: "/paul",
        permanent: true,
      },
      {
        source: "/engels/:path*",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
