import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { ContactController } from './contact.controller';
import { contactProviders } from './contact.providers';
import { ContactService } from './contact.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...contactProviders,
    ContactService,
  ],
  controllers: [ContactController],
  exports: [ContactService]
})
export class ContactModule { }
