import { Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';

@Injectable()
export class MovementService {
  createMove(createMovementDto: CreateMovementDto) {
    return `Move to direction: ${createMovementDto.direction}`;
  }
}
