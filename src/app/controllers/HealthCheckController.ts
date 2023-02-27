import { Get, Controller } from 'routing-controllers'
import { Service } from 'typedi'

import { prisma } from '../../prismaClient'

@Controller()
@Service()
export class HealthCheckController {
  @Get('/health')
  async healthCheck(): Promise<string> {
    await prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    })

    return 'ok'
  }
}
