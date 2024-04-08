export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10),
  },
  jwt: {
    accessSecret: process.env.JWT_SECRET_KEY,
    refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
    accessTokenExpiration: process.env.TOKEN_EXPIRE_TIME,
    refreshTokenExpiration: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  },
  crypto: {
    salt: +process.env.CRYPT_SALT,
  },
  log: {
    maxFileSize: +process.env.LOG_MAX_FILE_SIZE * 1024,
    logLevel: +process.env.LOG_LEVEL,
  },
});
