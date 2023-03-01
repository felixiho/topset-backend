import { Request, Response } from 'express'

export type TimedRequest = Request & {
  startTime: number
  executionTime: number
}

// Serialize an HTTP request.
export const serializeReq = function (req: TimedRequest) {
  if (!req || !req.connection) return req
  return {
    method: req.method, 
    // https://expressjs.com/en/api.html#req.originalUrl
    url: req.originalUrl || req.url,
    executionTime: req.executionTime,
    path: req.path,
    ip: req.ip,
    headers: req.headers,
    remoteAddress: req.connection.remoteAddress,
    remotePort: req.connection.remotePort,
  } 
}

// Serialize an HTTP response.
export const serializeRes = function (res: Response) {
  if (!res || !res.statusCode) return res
  return {
    statusCode: res.statusCode,
    header: (res as any)._header,
  }
}

/*
 * This function dumps long stack traces for exceptions having a cause() method.  
 */
function getFullErrorStack(ex: Error) {
  return ex.stack || ex.toString()
}

// Serialize an Error object 
export const serializeErr = (err: any) => {
  if (!err || !err.stack) return err
  const obj: any = {
    message: err.message,
    name: err.name,
    stack: getFullErrorStack(err),
  }

  ;['code', 'statusCode', 'response'].forEach((key) => {
    if (err[key] != null) {
      obj[key] = err[key]
    }
  })

  return obj
}
