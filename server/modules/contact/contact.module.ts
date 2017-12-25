import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { DatabaseModule } from '../../common/database/database.module';
import { contactProviders } from './contact.providers';
import { ContactController } from './contact.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...contactProviders,
    ContactService,
  ],
  controllers: [ContactController]
})
export class ContactModule { }
