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

//-------------------------------------------------//
//----------------------DTOs-----------------------//
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

import { BCRYPT_SALT_ROUNDS } from '../config/envs.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto) {
    //Verificacion de la existencia del email
    const userFound: User | null = await this.usersRepository.findOne({
      where: { email: newUser.email },
    });

    if (userFound) {
      throw new ConflictException('El email ya existe.');
    }
    // Hashear de la contraseña
    const passwordHashed: string = await bcrypt.hash(
      newUser.password,
      BCRYPT_SALT_ROUNDS,
    );

    //Creacion del usuario
    const userCreated: User = this.usersRepository.create({
      ...newUser,
      password_hashed: passwordHashed,
    });

    if (!userCreated) {
      throw new BadRequestException('No se pudo registrar al usuario.');
    }

    //Guardado del usuario
    const completeUser: User = await this.usersRepository.save(userCreated);

    const { id, password_hashed, is_admin, ...partialUser } = completeUser;

    return {
      message: 'Registro exitoso.',
      user: partialUser,
    };
  }

  async findAll() {
    const users: User[] = await this.usersRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios.');
    }

    return { message: 'Lista de usuarios obtenida exitosamente.', users };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
