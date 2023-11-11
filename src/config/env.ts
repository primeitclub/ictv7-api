import { config } from 'dotenv';

config();

export const env = {
  port: process.env.PORT || 6969,
  version: process.env.VERSION || 'alpha'
};

export const googleClient = {
  id: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET
};
