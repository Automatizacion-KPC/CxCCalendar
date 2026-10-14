//-------------------------------------------------//
//---------------------Librerias-------------------//
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

//-------------------------------------------------//
//-------------------------------------------------//
export class CreateCalendarDto {
  @ApiProperty({
    description: 'ID  del cliente.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id_client: string;

  @ApiProperty({
    description: 'Fecha de visita.',
    example: '2026-10-14',
    format: 'YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  visit_date: Date;

  @ApiProperty({
    description: 'Acuerdos tomados o comentario de la visita.',
    example:
      'Acuerdo de pago con el cliente para liquidar saldo pendiente con abonos quincenales.',
    maxLength: 300,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  agreement: string;

  @ApiProperty({
    description: 'Próxima fecha de visita.',
    example: '2026-12-24',
    format: 'YYYY-MM-DD',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  next_visit: Date;

  @ApiProperty({
    description: 'ID  del estado de gestión.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id_management_status: string;
}
