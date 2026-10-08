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
//-------------------------------------------------//
export class CreateUserDto {
  @ApiProperty({
    description:
      'El email es único, obligatorio y debe estar en formato de email valido.',
    example: 'puesto_pc@koonol.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description:
      'La contraseña debe tener al menos 8 caracteres y máximo 15, debe poseer al menos una minúscula, una mayúscula, un número y un caracter especial.',
    example: 'Contrasena123!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener al menos 8 caracteres y máximo 15, debe poseer al menos una minúscula, una mayúscula, un número y un caracter especial.',
  })
  password_hash: string;

  @ApiProperty({
    description:
      'El nombre es obligatorio y debe estar entre 3 y 50 caracteres.',
    example: 'Juan Lopez',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'No se debe recibir la propiedad y es de tipo boolean.',
  })
  @IsEmpty()
  is_admin?: boolean;
}