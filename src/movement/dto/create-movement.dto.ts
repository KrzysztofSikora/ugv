import { IsIn, IsNotEmpty } from 'class-validator';

type DirectionType = 'FORWARD' | 'BACK' | 'RIGHT' | 'LEFT';
const validDirections: DirectionType[] = ['FORWARD', 'BACK', 'RIGHT', 'LEFT'];

export class CreateMovementDto {
  @IsNotEmpty()
  @IsIn(validDirections, { message: 'Invalid direction' })
  direction: DirectionType;
}
