/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.HIETAKULMA_LOCAL_PREVIEW === '1'
    ? process.env.HIETAKULMA_POSTGRES_BROWSER === '1' ? '.postgres-browser/build' : '.local-preview/build'
    : '.next',
  async headers() {
    return process.env.HIETAKULMA_LOCAL_PREVIEW === '1' && process.env.PREVIEW_ID
      ? [{ source: '/:path*', headers: [{ key: 'X-Hietakulma-Preview', value: process.env.PREVIEW_ID }] }]
      : [];
  },
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/icon.svg', permanent: true },
      { source: '/puuristikot', destination: '/kattoristikot', permanent: true },
      { source: '/puutalot-ja-elementit', destination: '/puutalot', permanent: true },
      { source: '/asiakaskertomukset', destination: '/kohteet', permanent: true },
      { source: '/yritystarina', destination: '/tarina', permanent: true },
      { source: '/pyyda-tarjous-kattoristikko', destination: '/ota-yhteytta', permanent: true },
      { source: '/pyyda-tarjous-elementit', destination: '/ota-yhteytta', permanent: true },
    ];
  },
};

module.exports = nextConfig;
