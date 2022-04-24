/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIRE_API_KEY: process.env.FIRE_API_KEY,
    FIRE_AUTH_DOMAIN: process.env.FIRE_AUTH_DOMAIN,
    FIRE_PROJECT_ID: process.env.FIRE_PROJECT_ID,
    FIRE_STORAGE_BUCKET: process.env.FIRE_STORAGE_BUCKET,
    FIRE_MESSAGING_SENDER_ID: process.env.FIRE_MESSAGING_SENDER_ID,
    FIRE_APP_ID: process.env.FIRE_APP_ID,
    FIRE_MEASUREMENT_ID: process.env.FIRE_MEASUREMENT_ID,
  },
};

module.exports = nextConfig
