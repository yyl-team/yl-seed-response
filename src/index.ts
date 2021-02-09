export interface ResponseFnMap {
  [key: string]: ResponseFn[]
}
export type ResponseFn<A extends any[] = any[]> = (...args: A) => any

export interface TriggerLogMap {
  [key: string]: any[]
}

function toCtx<T = any>(ctx: any) {
  return ctx as T
}

export default class Response {
  resFn: ResponseFnMap = {}
  triLog: TriggerLogMap = {}
  constructor() {
    this.resFn = {}
    this.triLog = {}
    return this
  }

  on<A extends any[] = any[]>(eventName: string, fn: ResponseFn<A>) {
    if (!(eventName in this.resFn)) {
      this.resFn[eventName] = []
    }

    if (typeof fn !== 'function') {
      return this
    }

    this.resFn[eventName].push(fn)

    if (this.triLog[eventName]?.length) {
      this.triLog[eventName].forEach((args) => {
        fn(...args)
      })
    }
    return this
  }

  trigger<A extends any[] = any[]>(eventName: string, args: A) {
    const handleFns = this.resFn[eventName]
    if (handleFns?.length) {
      handleFns.forEach((fn) => {
        fn(...args)
      })
    }

    if (!this.triLog[eventName]) {
      this.triLog[eventName] = []
    }

    this.triLog[eventName].push(args)
    if (eventName === 'finished' && this.resFn.finished && this.resFn.finished.length) {
      this.triLog = {}
    }
    return this
  }

  off(eventName?: string) {
    if (eventName) {
      this.resFn[eventName] = []
      this.triLog[eventName] = []
    } else {
      this.resFn = {}
      this.triLog = {}
    }
    return this
  }
}

module.exports = Response
