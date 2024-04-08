import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import config from '../config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { AuthModule } from '../auth/auth.module';
import { CustomLoggerService } from '../logger/logger.service';
import { CustomLoggerModule } from '../logger/logger.module';
import { JsonMiddleware } from '../common/middleware/json.middleware';
import { CustomLoggerMiddleware } from 'src/logger/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    AuthModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CustomLoggerService,
    {
      provide: CustomLoggerService,
      useFactory: (configService: ConfigService) => {
        const loggingService = new CustomLoggerService(configService);
        return loggingService;
      },
      inject: [ConfigService],
    },
  ],
  exports: [CustomLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonMiddleware).forRoutes('*');
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
