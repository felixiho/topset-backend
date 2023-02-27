import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import Container, { Service } from 'typedi'

import { UnauthorizedError } from '../core/errors'
import { logger } from '../core/logging/logger' 
// import { AuthService } from '../modules/account/services/AuthService'

const AUTH_TOKEN = 'Authorization'

export type UserRequest = Request & { userId: number }

@Service()
export class AdminAuthMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  async use(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // const repo = Container.get(AuthService)
    const authorization = req.header(AUTH_TOKEN)

    try {
      if (!authorization) {
        throw new UnauthorizedError('No authorization provided')
      }

      if (!authorization.startsWith('Bearer')) {
        throw new UnauthorizedError('Invalid auth token')
      }

      const split = authorization.split('Bearer ')
      if (split.length !== 2) {
        throw new UnauthorizedError('Invalid auth token')
      }

      // const token = split[1]
      // const userId = await repo.verifyAdminToken(token)
      // req.userId = userId

      next()
    } catch (error) {
      logger.error('an error occurred', { error })
      next(error)
    }
  }
}
