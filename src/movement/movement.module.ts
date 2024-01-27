import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import {CommunicationService} from "../communication/communication.service";
import {AppService} from "../app.service";

@Module({
  controllers: [MovementController],
  providers: [MovementService, CommunicationService],
  exports: [MovementService],

})
export class MovementModule {}
