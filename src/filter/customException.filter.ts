import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { getTimestamp } from 'src/common/helpers/getTimestamp';
import { CustomLoggerService } from 'src/logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const errorMessage = `Unexpected error during request processing: 
      Method: ${request.method}, 
      URL: ${request.url}, 
      Body: ${JSON.stringify(request.body)}, 
      Exception: ${exception.stack}`;

    const errorResponse = {
      statusCode: exception.getStatus(),
      message: errorMessage,
      path: ctx.getRequest<Request>().url,
      timestamp: getTimestamp(),
    };

    this.logger.error(errorResponse);
    ctx.getResponse<Response>().setHeader('Skip-Logging', 'true');

    ctx
      .getResponse<Response>()
      .status(exception.getStatus())
      .json(errorResponse);
  }
}
