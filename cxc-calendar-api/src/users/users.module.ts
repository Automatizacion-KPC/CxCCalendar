//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//------------Controladores y Proveedores----------//
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

//-------------------------------------------------//
//--------------------Entities---------------------//
import { User } from './entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
