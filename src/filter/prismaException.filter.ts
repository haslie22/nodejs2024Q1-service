import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Catch(Prisma.PrismaClientKnownRequestError)
export default class PrismaExceptionFilter extends BaseExceptionFilter {
  errorHandlers = {
    [PrismaClientErrorCode.UniqueConstraintViolation]: this.handleConflict,
    [PrismaClientErrorCode.RecordNotFound]: this.handleNotFound,
    [PrismaClientErrorCode.InvalidData]: this.handleBadRequest,
    [PrismaClientErrorCode.ForeignKeyViolation]: this.handleUnprocessableEntity,
  };

  private handleBadRequest(response: Response) {
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid data',
    });
  }

  private handleNotFound(response: Response) {
    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    });
  }

  private handleUnprocessableEntity(response: Response) {
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Invalid password',
    });
  }

  private handleConflict(response: Response) {
    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: 'User already exists',
    });
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const handler = this.errorHandlers[exception.code];
    if (handler) handler(response);
    else super.catch(exception, host);
  }
}
