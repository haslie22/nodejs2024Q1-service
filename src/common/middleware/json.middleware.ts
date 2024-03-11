import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JsonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      try {
        req.body = JSON.parse(req.body);
      } catch (error) {
        console.error('Error parsing request body as JSON:', error);
      }
    }

    res.setHeader('Content-Type', 'application/json');
    next();
  }
}
