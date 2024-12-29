import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware {
  constructor() {
    this.logger;
  }

  public async logger(Req: Request, Res: Response, next: NextFunction) {
    console.log(
      `OriginURL: ${Req?.originalUrl} - Req Headers: ${JSON.stringify(
        Req?.headers
      )} - Req Body: ${JSON.stringify(Req?.body)}`
    );
    next();
  }
}
