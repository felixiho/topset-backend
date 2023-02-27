import winston, { LoggerOptions } from 'winston'

import { AnyDict } from '../types'
import { LogFormat } from './formatters'

// support backwards compatibility of bunyan logger
type MsgFirst = [string, AnyDict?]
type MetaFirst = [AnyDict, string?]

class Logger {
  winston: winston.Logger

  constructor(protected initialOptions: LoggerOptions) {
    this.winston = winston.createLogger(initialOptions)
  }

  debug(...args: MsgFirst): void
  debug(...args: MetaFirst): void
  debug(...args: MsgFirst | MetaFirst): void {
    if (typeof args[0] === 'string') {
      const [first, second] = args as MsgFirst
      this.winston.debug(first, second)
    } else {
      const [first, second] = args as MetaFirst
      if (typeof second === 'string') {
        this.winston.debug(second, first)
      } else {
        this.winston.debug(first)
      }
    }
  }

  info(...args: MsgFirst): void
  info(...args: MetaFirst): void
  info(...args: MsgFirst | MetaFirst): void {
    if (typeof args[0] === 'string') {
      const [first, second] = args as MsgFirst
      this.winston.info(first, second)
    } else {
      const [first, second] = args as MetaFirst
      if (typeof second === 'string') {
        this.winston.info(second, first)
      } else {
        this.winston.info(first)
      }
    }
  }

  warn(...args: MsgFirst): void
  warn(...args: MetaFirst): void
  warn(...args: MsgFirst | MetaFirst): void {
    if (typeof args[0] === 'string') {
      const [first, second] = args as MsgFirst
      this.winston.warn(first, second)
    } else {
      const [first, second] = args as MetaFirst
      if (typeof second === 'string') {
        this.winston.warn(second, first)
      } else {
        this.winston.warn(first)
      }
    }
  }

  error(...args: MsgFirst): void
  error(...args: MetaFirst): void
  error(...args: MsgFirst | MetaFirst): void {
    if (typeof args[0] === 'string') {
      const [first, second] = args as MsgFirst
      this.winston.error(first, second)
    } else {
      const [first, second] = args as MetaFirst
      if (typeof second === 'string') {
        this.winston.error(second, first)
      } else {
        this.winston.error(first)
      }
    }
  }

  configure(options: LoggerOptions) {
    this.winston.configure({
      ...this.initialOptions,
      ...options,
    })
    if (options.level) {
      // manually override the level on each transport
      const level = options.level.toLowerCase()
      this.winston.transports.forEach((transport) => {
        transport.level = level
      })
    }
  }
}

export const logger = new Logger({
  format: LogFormat.json,
  transports: [new winston.transports.Console()],
})
