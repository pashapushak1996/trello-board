module.exports = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.MONGO_URL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
};
