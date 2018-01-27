import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

@Module({
  components: [EventGateway],
  exports: [EventGateway]
})
export class GatewayModule {}
