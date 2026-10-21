import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller.js';
import { BackendService } from './backend.service.js';

@Module({
  controllers: [BackendController],
  providers: [BackendService]
})
export class BackendModule {}
