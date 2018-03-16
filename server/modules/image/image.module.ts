import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { ImageController } from './image.controller';
import { imageProviders } from './image.providers';
import { ImageService } from './image.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...imageProviders,
    ImageService,
  ],
  controllers: [ImageController],
  exports: [ImageService]
})
export class ImageModule { }
