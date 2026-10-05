/** @type {import('next').Config} */
const nextConfig = {
    allowedDevOrigins: ['172.20.10.3:3000', '172.20.10.3'],

    // Old or planned URLs that people may still link to.
    async redirects() {
      return [
        { source: '/find-us', destination: '/network', permanent: true },
        { source: '/app-download', destination: '/#download-app', permanent: false },
        { source: '/blog', destination: '/#news', permanent: false },
      ];
    },
  };
  
  module.exports = nextConfig;
