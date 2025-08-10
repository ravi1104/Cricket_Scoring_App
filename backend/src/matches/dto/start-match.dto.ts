import { IsString, IsOptional } from 'class-validator';

export class StartMatchDto {
  @IsString()
  teamA!: string;

  @IsString()
  teamB!: string;

  @IsOptional()
  meta?: any;
}
