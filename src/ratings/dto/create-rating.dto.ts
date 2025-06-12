import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  score: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsInt()
  movieId: number;
}