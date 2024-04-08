import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import PrismaExceptionFilter from './filter/prismaException.filter';
import { CustomExceptionFilter } from './filter/customException.filter';
import { CustomLoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 4000;

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const loggingService = new CustomLoggerService(configService);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new CustomExceptionFilter(loggingService),
  );

  process.on('uncaughtException', (err, origin) => {
    loggingService.error(`Uncaught Exception: ${err.message}`, origin);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.warn(`Unhandled Rejection: ${reason}`);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('3.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(APP_PORT, () => {
    loggingService.log(`Application started on port ${APP_PORT}`);

    // Uncomment the next lines to test Logger and unhandled exceptions/rejections.
    // Get acquainted with README to get more info about logs.

    // loggingService.error('Test Error');
    // loggingService.warn('Test Warn');
    // loggingService.log('Test Log');
    // loggingService.verbose('Test Verbose');
    // loggingService.debug('Test Debug');

    // Promise.reject('Test UnhandledRejection');
    // throw new Error('Test UncaughtException');
  });
}

bootstrap();
