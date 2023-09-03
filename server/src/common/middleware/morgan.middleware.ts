import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly logger = new Logger('MorganLogger');
  use(req: Request, res: Response, next: NextFunction) {
    const stream = {
      write: (message: string) => {
        this.logger.log(message.trim());
      },
    };
    return morgan('tiny', { stream })(req, res, next);
  }
}
