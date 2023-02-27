import 'reflect-metadata' 
import cors from 'cors'
import deepmerge from 'deepmerge'
import * as express from 'express'
import { Express } from 'express'
import {
  useExpressServer,
  RoutingControllersOptions,
  useContainer,
} from 'routing-controllers'
import Container from 'typedi'

import { config } from '../config/config'
import { ApiResponseMiddleware } from '../middleware/ApiResponseMiddleware'
import { ErrorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware'
import {
  LoggingEndMiddleware,
  LoggingErrorMiddleware,
  LoggingStartMiddleware,
} from '../middleware/LoggingMiddleware' 
useContainer(Container)

export abstract class BaseApplication {
  private app: express.Express

  private controllerOptions: RoutingControllersOptions

  constructor() {
    this.controllerOptions = deepmerge(
      this.getDefaultConfig(),
      this.getControllerOptions()
    )

    this.app = express.default() 

    /**
     * Setup application configured controllers
     */
    this.setupExpressApp(this.app)
    this.setupCors() 
    this.setupApiControllers()
  }

  public getExpressApp(): Express {
    return this.app
  }

  public listen(port: number, cb: () => void): void {
    this.app.listen(port, cb)
  }

  abstract getControllerOptions(): RoutingControllersOptions

  protected setupExpressApp(_app: express.Express): void {}
 
  private setupApiControllers() {
    useExpressServer(this.app, this.controllerOptions)
  }

  protected setupCors() {
    this.app.use(cors())
  }

  protected getDefaultConfig(): RoutingControllersOptions {
    return {
      middlewares: [
        LoggingStartMiddleware, 
        ApiResponseMiddleware,
        ErrorHandlerMiddleware, 
        LoggingErrorMiddleware,
        LoggingEndMiddleware,
      ],
      validation: {
        forbidUnknownValues: true,
        validationError: { target: false },
      },
      defaultErrorHandler: false,
      routePrefix: '/api',
    }
  }
}
