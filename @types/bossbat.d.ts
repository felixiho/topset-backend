declare module 'bossbat' {
  import { RedisOptions } from 'ioredis'

  export interface JobDefinition {
    work: () => ( Promise<unknown> | unknown )
    every?: string | number
    cron?: string
  }

  export default class Bossbat {
    constructor(options: {
      connection: RedisOptions | string,
      prefix?: string,
      ttl?: number,
      tz?: string,
      disableRedisConfig?: boolean,
    })

    /**
     * Shuts down a bossbat instance, closing all redis connections. This does
     * not cancel any scheduled work, and does not stop it from running in any
     * other bossbat instances.
     */
    quit(): void

    /**
     * Schedules recurring work to be done.
     */
    hire(name: string, definition: JobDefinition): void

    /**
     * Cancels any scheduled jobs with name jobName. This does not stop any
     * demanded jobs from running.
     */
    fire(name: string): void

    /**
     * QA is used to register functions that will be invoked any time a job is
     * run. This function can be called multiple times to register multiple QA
     * functions. The passed qaFunction function will be called with jobName, and
     * jobDefinition from the hire function, as well as a next function, which
     * should be called when the QA function is complete. The next function
     * returns a promise that can be used to run code after a job is completed.
     */
    qa(fn: (name: string, definition: JobDefinition, next: (() => void)) => void): void

    /**
     * Runs a job as soon as possible, outside of the scheduled jobs. Demanded
     * jobs still run with the same locking mechanism that scheduled jobs run
     * with, ensuring only one instance runs the job at a time. This does not
     * prevent any scheduled jobs from running, unless the demand is running at
     * the same time as a scheduled job and all instances fail to acquire a lock
     * on the job.
     */
    demand(name: string): void

    // Semi-privates:

    getJobKey(name: string): string

    getDemandKey(name: string): string

    getLockKey(name: string): string

    doWork(name: string): void

    scheduleRun(name: string, definition?: JobDefinition): unknown
  }
}
