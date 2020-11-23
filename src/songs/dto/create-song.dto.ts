import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  trackId: string;
}
