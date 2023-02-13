const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const basePath = '/idocs';

module.exports = {
  ...withNextra(),
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};