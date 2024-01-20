import { Controller, Post, Body } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post('/')
  move(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.createMove(createMovementDto);
  }
}
