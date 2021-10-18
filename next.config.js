module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  env: {
    YOUTUBE_API: process.env.YOUTUBE_API,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
