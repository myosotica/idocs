const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const basePath = '/idocs';
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

module.exports = {
  ...withNextra(),
  ...nextConfig
};