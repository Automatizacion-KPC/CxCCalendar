//-------------------------------------------------//
//--------------------Librerias--------------------//
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//-------------------------------------------------//
//-----------------Servicios y Dto's---------------//
import { ManagementStatusCatalogService } from './management-status-catalog.service.js';
import { CreateManagementStatusCatalogDto } from './dto/create-management-status-catalog.dto.js';
import { UpdateManagementStatusCatalogDto } from './dto/update-management-status-catalog.dto.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Controller('management-status-catalog')
export class ManagementStatusCatalogController {
  constructor(
    private readonly managementStatusCatalogService: ManagementStatusCatalogService,
  ) {}

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver array de estados de gestión.',
    description:
      'Devuelve una lista de todos los estados de gestión en el catálogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados de gestión obtenida exitosamente.',
  })
  @Get()
  findAll() {
    return this.managementStatusCatalogService.findAll();
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver busqueda de estado de gestión en específico',
    description: 'Devuelve un estado de gestión del catálogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de gestión obtenido exitosamente',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.managementStatusCatalogService.findOne(id);
  }
}
