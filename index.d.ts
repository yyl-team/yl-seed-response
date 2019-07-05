type callback = (...args:any[]) => any;
declare class Response {
  constructor(): void;
  public on(eventName: string, fn: callback): void;
  public trigger(eventName: string, argv: any[]): void;
}