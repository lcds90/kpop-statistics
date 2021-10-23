const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  env: {
    YOUTUBE_API: process.env.YOUTUBE_API,
  },
  /*   async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  }, */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
};
