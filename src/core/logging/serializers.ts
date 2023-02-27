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
    // Accept `req.originalUrl` for expressjs usage.
    // https://expressjs.com/en/api.html#req.originalUrl
    url: req.originalUrl || req.url,
    executionTime: req.executionTime,
    path: req.path,
    ip: req.ip,
    headers: req.headers,
    remoteAddress: req.connection.remoteAddress,
    remotePort: req.connection.remotePort,
  }
  // Trailers: Skipping for speed. If you need trailers in your app, then
  // make a custom serializer.
  //if (Object.keys(trailers).length > 0) {
  //  obj.trailers = req.trailers;
  //}
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
 * This function dumps long stack traces for exceptions having a cause()
 * method. The error classes from
 * [verror](https://github.com/davepacheco/node-verror) and
 * [restify v2.0](https://github.com/mcavage/node-restify) are examples.
 *
 * Based on `dumpException` in
 * https://github.com/davepacheco/node-extsprintf/blob/master/lib/extsprintf.js
 */
function getFullErrorStack(ex: Error) {
  return ex.stack || ex.toString()
}

// Serialize an Error object
// (Core error properties are enumerable in node 0.4, not in 0.6).
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
