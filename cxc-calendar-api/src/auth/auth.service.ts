//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//-------------------------------------------------//
//----------------------DTOs-----------------------//
import { LoginDto } from './dto/login.dto.js';

//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //---------------------------------------//
  async singIn(credential: LoginDto) {
    const user: User | null = await this.usersRepository.findOne({
      where: { email: credential.email, is_active: true },
    });

    if (!user) {
      throw new BadRequestException('Credenciales incorrectas.');
    }

    //Validad contraseña
    const matchPasswords = await bcrypt.compare(
      credential.password,
      user.password_hashed,
    );

    if (!matchPasswords) {
      throw new BadRequestException('Credenciales incorrectas.');
    }

    //Firmar crdenciales (token)
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    };

    //Token generado
    const token = this.jwtService.sign(payload);

    //Decodificar el token para extraer la fecha de expiracion
    const decodedPayload = this.jwtService.decode(token);

    //Convertir el timestamp a un Date legible (ISO Date)
    const expirationDate = new Date(decodedPayload.exp * 1000).toISOString();

    return {
      message: 'Inicio exitoso.',
      accesToken: token,
      exp: expirationDate,
    };
  }
}
