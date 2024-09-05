/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: { displayName: true, ssr: true } },
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

module.exports = nextConfig;
