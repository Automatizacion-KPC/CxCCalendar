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

  //---------------------------------------//
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

  //---------------------------------------//
  async findAll(isActive?: boolean) {
    const whereCondition =
      isActive !== undefined ? { is_active: isActive } : {};

    const users: User[] = await this.usersRepository.find({
      where: whereCondition,
    });
    if (!users || users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios.');
    }

    const partialUsers = users.map(
      ({ password_hashed, is_admin, ...partialUser }) => {
        return partialUser;
      },
    );

    return {
      message: 'Lista de usuarios obtenida exitosamente.',
      users: partialUsers,
    };
  }

  //---------------------------------------//
  async findOne(id: string) {
    const user: User | null = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    const { password_hashed, is_admin, ...partialUser } = user;
    return {
      message: 'Usuario obtenido exitosamente.',
      user: partialUser,
    };
  }

  //---------------------------------------//
  async updateToAdmin(id: string) {
    const user: User | undefined = await this.usersRepository.preload({
      id,
      is_admin: true,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    const adminUser = await this.usersRepository.save(user);

    const { password_hashed, ...partialUser } = adminUser;

    return {
      message: 'Usuario actualizado a administrador exitosamente.',
      user: partialUser,
    };
  }

  //---------------------------------------//
  async update(id: string, userToUpdate: UpdateUserDto) {
    const user: User | undefined = await this.usersRepository.preload({
      id,
      ...userToUpdate,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    const updatedUser = await this.usersRepository.save(user);

    const { password_hashed, is_admin, ...partialUser } = updatedUser;

    return {
      message: 'Usuario actualizado exitosamente.',
      user: partialUser,
    };
  }

  //---------------------------------------//
  async deactivate(id: string) {
    const is_active = false;

    const user: User | undefined = await this.usersRepository.preload({
      id,
      is_active,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    const deactivatedUser = await this.usersRepository.save(user);

    const { password_hashed, is_admin, ...partialUser } = deactivatedUser;

    return {
      message: 'Usuario desactivado exitosamente.',
      user: partialUser,
    };
  }
}
