//-------------------------------------------------//
//---------------------Librerias-------------------//
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

//-------------------------------------------------//
//-------------------------------------------------//
export class CreateManagementStatusCatalogDto {
  @ApiProperty({
    description: 'Siglas del estado de gestion del cliente.',
    example: 'CE',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  abbreviation: string;

  @ApiProperty({
    description: 'Nombre del estado de gestión.',
    example: 'CLIENTE EVASIVO',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    description: 'Descripción del uso del estado.',
    example:
      'CUANDO EL CLIENTE NO QUIERE RECIBIRNOS, CONTESTAR LLAMADAS, MENSAJES Y CORREOS',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  description: string;
}
