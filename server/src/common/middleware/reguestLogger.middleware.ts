import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequsetLoggerMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    if (this.configService.get('NODE_ENV') === 'dev') {
      this.logger.log({
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,
      });
    }
    next();
  }
}
