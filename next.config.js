module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  env: {
    DB_APP_KEY: process.env.DB_APP_KEY,
    DB_AUTH_DOMAIN: process.env.DB_AUTH_DOMAIN,
    DB_PROJECT_ID: process.env.DB_PROJECT_ID,
    DB_STORAGE_BUCKET: process.env.DB_STORAGE_BUCKET,
    DB_MESSAGE_SENDER: process.env.DB_MESSAGE_SENDER,
    DB_APP_ID: process.env.DB_APP_ID,
    AUTH_KEY: process.env.AUTH_KEY,
  },
};
