//-------------------------------------------------//
//---------------------Librerias-------------------//
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';

//-------------------------------------------------//
//-------------------------------------------------//
export class CreateClientDto {
  gov_id: string;

  name: string;

  sap_id: string;

  microsip_id: string;


  management_status: string;

  management_description: string;
}
