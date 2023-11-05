import { config } from 'dotenv';

config();

export const env = {
  port: process.env.PORT || 6969,
  version: process.env.VERSION || 'alpha'
};
