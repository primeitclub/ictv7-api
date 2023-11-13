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
