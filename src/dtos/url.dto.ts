import { IsArray, IsNumber, IsNumberString, IsString, IsEnum, Length, ValidateIf } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  public url: string;

  @IsNumber()
  public type: number;

  @ValidateIf(o => o.type === 1)
  @IsString()
  public customUrl: string;
}

export class UrlViewDto {
  @IsString()
  @Length(1, 50)
  public url: string;
}
