import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateStationDto {

  @IsNotEmpty()
  readonly _attributes;

  @IsNotEmpty()
  readonly adresse;

  @IsNotEmpty()
  readonly ville;

  @IsNotEmpty()
  readonly services;

  @IsNotEmpty()
  readonly prix;

  @IsNotEmpty()
  readonly rupture;
}

