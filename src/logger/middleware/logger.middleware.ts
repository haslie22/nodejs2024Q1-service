import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggerService } from '../logger.service';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date();
    req['startTime'] = startTime;

    res.on('finish', () => {
      this.logger.logRequest(req);

      if (res.getHeader && res.getHeader('Type-Logging') === 'error') {
        return;
      }

      this.logger.logResponse(req, res.statusCode);
    });

    next();
  }
}
