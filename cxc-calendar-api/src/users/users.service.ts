//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//-------------------------------------------------//
//----------------------DTOs-----------------------//
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

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
      throw new ConflictException('Email already exist.');
    }
    // Hash de la contraseña
    //const passwordHashed: string = await bcrypt.hash(user.password_hash, SALT);

    //Creacion del usuario
    const userCreated: User = this.usersRepository.create(newUser);

    if (!userCreated) {
      throw new BadRequestException("User couldn't be created.");
    }

    //Guardado del usuario
    const completeUser: User = await this.usersRepository.save(userCreated);

    const { password_hash, is_admin, ...partialUser } = completeUser;

    return {
      message: 'User sign up successfully.',
      user: partialUser,
    };
  }

  async findAll() {
    const users: User[] = await this.usersRepository.find();
    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return { message: 'Users found.', users };
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
