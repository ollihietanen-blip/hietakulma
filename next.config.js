/** @type {import('next').NextConfig} */
const nextConfig = {
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
