import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type DirectionType = 'FORWARD' | 'BACK' | 'RIGHT' | 'LEFT' | 'STOP';
const validDirections: DirectionType[] = [
  'FORWARD',
  'BACK',
  'RIGHT',
  'LEFT',
  'STOP',
];

export class CreateMovementDto {
  @ApiProperty({ examples: validDirections })
  @IsNotEmpty()
  @IsIn(validDirections, { message: 'Invalid direction' })
  direction: DirectionType;
}
