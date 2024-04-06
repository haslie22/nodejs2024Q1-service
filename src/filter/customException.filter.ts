import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomLoggerService } from 'src/logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorMessage = `Unexpected error during request processing: 
      Method: ${request.method}, 
      URL: ${request.url}, 
      Body: ${JSON.stringify(request.body)}, 
      Exception: ${exception.stack}`;

    this.logger.error(errorMessage);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
}
