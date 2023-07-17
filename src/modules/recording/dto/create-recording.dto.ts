import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  audio: Express.Multer.File;
}
