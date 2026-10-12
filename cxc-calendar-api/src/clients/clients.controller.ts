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
      'Devuelve una lista de todos los clientes. Puede filtrarse para obtener únicamente los activos o inactivos usando "?active" o por vendedor usando "?seller".',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida exitosamente.',
  })
  @Get()
  findAll(@Query('active') active?: string, @Query('seller') seller?: string) {
    let isActiveFilter: boolean | undefined = undefined;

    if (active === 'true') {
      isActiveFilter = true; // Solo activos
    } else if (active === 'false') {
      isActiveFilter = false; // Solo inactivos
    }
    return this.clientsService.findAll(isActiveFilter, seller);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver busqueda de cliente específico',
    description: 'Devuelve un cliente en específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente obtenido exitosamente',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Actualizar cliente a partir de su id.',
    description: 'Actualiza los campos de un cliente buscándolo por su id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado exitosamente.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() client: UpdateClientDto,
  ) {
    return this.clientsService.update(id, client);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Desactivar cliente a partir de su id.',
    description: 'Desactiva un cliente buscándolo por su id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente desactivado exitosamente.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.remove(id);
  }
}
