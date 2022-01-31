import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateStationDto {

  @IsString()
  readonly name:any;
  
  @IsNotEmpty()
  readonly _attributes: any;

  @IsNotEmpty()
  readonly adress: any;

  @IsNotEmpty()
  readonly ville: any;

  @IsNotEmpty()
  readonly horaires: string;
}

