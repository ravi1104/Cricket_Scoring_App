import { IsNumber, IsString, IsOptional, IsIn, Min } from 'class-validator';

export class AddCommentaryDto {
  @IsNumber()
  @Min(0)
  over!: number;

  @IsNumber()
  @Min(1)
  ball!: number;

  @IsString()
  @IsIn(['run', 'wicket', 'wide', 'no-ball', 'bye', 'leg-bye'])
  type!: string;

  @IsOptional()
  @IsNumber()
  runs?: number;

  @IsOptional()
  @IsString()
  text?: string;
}
