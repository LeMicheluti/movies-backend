import { IsInt, IsPositive } from 'class-validator';

export class ActorIdDto {
  @IsInt()
  @IsPositive()
  id: number;
}