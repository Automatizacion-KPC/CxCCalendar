//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//------------Controladores y Proveedores----------//
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

//-------------------------------------------------//
//--------------------Entities---------------------//
import { User } from '../users/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
