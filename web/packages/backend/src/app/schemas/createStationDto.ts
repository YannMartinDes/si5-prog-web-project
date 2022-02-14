import { MaxLength, IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateStationDto {

  @IsNotEmpty()
  readonly _attributes!:string;

  @IsNotEmpty()
  readonly adresse!:string;

  @IsNotEmpty()
  readonly ville!:string;

  @IsNotEmpty()
  readonly services!:string;

  @IsNotEmpty()
  @IsNumber()
  readonly prix!:number;

  @IsNotEmpty()
  readonly rupture!:string;
}

