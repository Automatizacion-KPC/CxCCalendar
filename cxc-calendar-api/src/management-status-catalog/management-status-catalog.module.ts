//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//------------Controladores y Proveedores----------//
import { ManagementStatusCatalogService } from './management-status-catalog.service.js';
import { ManagementStatusCatalogController } from './management-status-catalog.controller.js';

//-------------------------------------------------//
//--------------------Entities---------------------//
import { ManagementStatusCatalog } from './entities/management-status-catalog.entity.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Module({
  imports: [TypeOrmModule.forFeature([ManagementStatusCatalog])],
  controllers: [ManagementStatusCatalogController],
  providers: [ManagementStatusCatalogService],
})
export class ManagementStatusCatalogModule {}
