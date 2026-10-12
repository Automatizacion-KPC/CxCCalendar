//-------------------------------------------------//
//--------------------Librerias--------------------//
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//-------------------------------------------------//
//-----------------Servicios y Dto's---------------//
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  //---------------------------------------//
  @ApiOperation({
    summary: 'Crear nuevo registro de cliente.',
    description: 'Registra una nuevo cliente para crear registros de visitas.',
  })
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver array de clientes registrados.',
    description:
      'Devuelve una lista de todos los usuarios. Puede filtrarse para obtener únicamente los activos o inactivos usando "?active" o por vendedor usando "?seller".',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida exitosamente.',
  })
  @Get()
  findAll(@Query('active') active?: string, @Query('active') seller?: string) {
    let isActiveFilter: boolean | undefined = undefined;

    if (active === 'true') {
      isActiveFilter = true; // Solo activos
    } else if (active === 'false') {
      isActiveFilter = false; // Solo inactivos
    }
    return this.clientsService.findAll(isActiveFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
