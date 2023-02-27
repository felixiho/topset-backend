import * as dotenv from 'dotenv' // eslint-disable-line

import path from 'path' // eslint-disable-line
import { config } from './config'
// load .env and .secret files into process.env
dotenv.config()
dotenv.config({
  path: path.resolve(process.cwd(), './.secret'),
})

export default config.load({
  ENV: (process.env.NODE_ENV as string) || 'development',
  IS_DEV: process.env.NODE_ENV !== 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  IS_PROD: process.env.NODE_ENV === 'production',
  LOG_CHANNEL: (process.env.LOG_CHANNEL as string) || 'console',
  LOG_LEVEL: (process.env.LOG_LEVEL as string) || 'info',
  LOG_NAME: (process.env.LOG_NAME as string) || 'topset-backend', 
  // Mainly set so we can validate it's present.
  DATABASE_URL: (process.env.DATABASE_URL as string) || false, 
})
