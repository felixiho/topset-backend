import 'reflect-metadata'

import express from 'express'
import { RoutingControllersOptions } from 'routing-controllers'

import config from '../config'
import { logger } from '../core/logging/logger' 
import { BaseApplication } from './BaseApplication'
import { HealthCheckController } from './controllers/HealthCheckController'
import { GenresController } from '../modules/genres/GenresController'
import { MoviesController } from '../modules/movies/MoviesController'

if (config('IS_PROD')) {
  // logger.info({ action: 'init jobs' }, 'init jobs')
  // initJobs()
}

export class PublicApplication extends BaseApplication {
  getControllerOptions(): RoutingControllersOptions {
    return {
      controllers: [ 
        HealthCheckController, 
        GenresController,
        MoviesController
      ],
      routePrefix: '/api',
    }
  }

  protected setupExpressApp(app: express.Express): void {
    // Trust proxy-set headers (e.g. X-Forwarded-For) if the requesting IP is
    // a local address. This allows us to get the actuall client's IP address
    // from the request instead of the proxy's IP.
    // @see https://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', 'uniquelocal')
  }
}
