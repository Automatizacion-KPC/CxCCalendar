//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//------------Controladores y Proveedores----------//
import { ClientsService } from './clients.service.js';
import { ClientsController } from './clients.controller.js';

//-------------------------------------------------//
//--------------------Entities---------------------//
import { Client } from './entities/client.entity.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
