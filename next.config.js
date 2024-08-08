/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: { displayName: true, ssr: true } },
  reactStrictMode: false
};

module.exports = nextConfig;
