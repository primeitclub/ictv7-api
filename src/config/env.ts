import { config } from 'dotenv';

config();

export const env = {
  port: process.env.PORT || 6969,
  version: process.env.VERSION || 'alpha'
};

export const google = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callBackURL: process.env.GOOGLE_CALLBACK_URL
};

export const sessionKeys = {
  secretKey: process.env.SESSION_SECRET_KEY
};

export const jwt = {
  secretKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
};

export const smtp = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD
};
