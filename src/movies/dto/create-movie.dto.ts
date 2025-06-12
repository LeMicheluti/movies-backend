import { ActorIdDto } from 'actors/dto/actor-id.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'The actors list cannot be empty' })
  @ValidateNested({ each: true })
  @Type(() => ActorIdDto)
  actors: ActorIdDto[];
}