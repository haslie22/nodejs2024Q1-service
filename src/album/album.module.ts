import { Module } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [PrismaModule],
})
export class AlbumModule {}
