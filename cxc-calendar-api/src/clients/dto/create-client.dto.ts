//-------------------------------------------------//
//---------------------Librerias-------------------//
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

//-------------------------------------------------//
//-------------------------------------------------//
export class CreateClientDto {
  @ApiProperty({
    description:
      'RFC del cliente, en caso de no haber colocar el RFC genérico.',
    example: 'XAXX010101000',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(11)
  gov_id: string;

  @ApiProperty({
    description: 'Razón Social o Nombre Comerciál del CLiente.',
    example: 'Productos de Comercialización.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Clave SAP.',
    example: 'C00001.',
  })
  @IsString()
  @Length(6)
  @Matches(/^C\d{5}$/, {
    message:
      'El código debe comenzar con la letra "C" en mayúscula seguida de exactamente 5 dígitos (ejemplo: C00001).',
  })
  sap_id: string;

  @ApiProperty({
    description: 'Clave Microsip.',
    example: 'PCM00001.',
  })
  @IsString()
  @Length(8)
  microsip_id: string;

  @ApiProperty({
    description: 'Vendedor.',
    example: 'VENTAS_3',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  seller: string;

  @ApiProperty({
    description: 'Siglas del estatus de Gestión.',
    example: 'PP',
  })
  @IsString()
  @Length(2)
  management_status: string;
}
