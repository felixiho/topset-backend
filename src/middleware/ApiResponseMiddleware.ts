import { InterceptorInterface, Interceptor } from 'routing-controllers'
import { Service } from 'typedi'

import {
  ApiPaginatedResponse,
  generatePaginationResponse,
  isPaginatedResponse,
} from '../core/pagination'
import { ApiSuccessResponse } from '../core/types'

@Interceptor()
@Service()
export class ApiResponseMiddleware implements InterceptorInterface {
  /**
   * Wraps a successful response in the common api wrapper.
   */
  intercept(_: any, content: any): ApiSuccessResponse | null | undefined {
    // Don't wrap null or undefined because it interferes with the `@OnNull`
    // and `@OnUndefined` decorators.
    if (content === null || content === undefined) {
      return content
    }

    if (isPaginatedResponse(content)) {
      return {
        isError: false,
        result: content.items,
        pagination: generatePaginationResponse(content.pagination),
      } as ApiPaginatedResponse
    }

    return {
      isError: false,
      result: content,
    }
  }
}
