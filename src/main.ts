import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { JsonMiddleware } from './common/middleware/json.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(JsonMiddleware);

  await app.listen(4000);
}
bootstrap();
