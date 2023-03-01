import 'reflect-metadata'

import express from 'express'
import { RoutingControllersOptions } from 'routing-controllers'

import config from '../config' 
import { BaseApplication } from './BaseApplication'
import { HealthCheckController } from './controllers/HealthCheckController'
import { GenresController } from '../modules/genres/GenresController'
import { MoviesController } from '../modules/movies/MoviesController'

if (config('IS_PROD')) { 

  // i'd initialize background jobs here
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
    app.set('trust proxy', 'uniquelocal')
  }
}
