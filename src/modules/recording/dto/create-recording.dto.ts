import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecordingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  audio: string | null;
}
