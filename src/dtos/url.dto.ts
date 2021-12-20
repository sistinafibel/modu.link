import { IsArray, IsNumber, IsNumberString, IsString, IsEnum, Length } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @Length(5, 150)
  public url: string;
}

export class UrlViewDto {
  @IsString()
  @Length(1, 50)
  public url: string;
}
