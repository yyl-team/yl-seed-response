export interface ResponseFnMap {
    [key: string]: ResponseFn[];
}
export declare type ResponseFn<A extends any[] = any[]> = (...args: A) => any;
export interface TriggerLogMap {
    [key: string]: any[];
}
export default class Response {
    resFn: ResponseFnMap;
    triLog: TriggerLogMap;
    constructor();
    on<A extends any[] = any[]>(eventName: string, fn: ResponseFn<A>): this;
    trigger<A extends any[] = any[]>(eventName: string, args: A): this;
    off(eventName?: string): this;
}
