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
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //---------------------------------------//
  @ApiOperation({
    summary: 'Crear nuevo registro de usuario',
    description: 'Registra una nuevo usuario para utilizar la app.',
  })
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver array de usuarios registrados.',
    description:
      'Devuelve una lista de todos los usuarios. Puede filtrarse para obtener únicamente los activos o inactivos usando ?active.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
  })
  @Get()
  findAll(@Query('active') active?: string) {
    let isActiveFilter: boolean | undefined = undefined;

    if (active === 'true') {
      isActiveFilter = true; // Solo activos
    } else if (active === 'false') {
      isActiveFilter = false; // Solo inactivos
    }

    return this.usersService.findAll(isActiveFilter);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Devolver busqueda de usario específico',
    description: 'Devuelve un usuario en específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido exitosamente',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }
  //---------------------------------------//
  @ApiOperation({
    summary: 'Actualizar usuario a Admin.',
    description:
      'Actualiza un usuario a Admin por otro Admin buscándolo por su id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @Patch('/admin/:id')
  updateToAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.updateToAdmin(id);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Actualizar usuario a partir de su id.',
    description: 'Actualiza los campos de un usuario buscándolo por su id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  //---------------------------------------//
  @ApiOperation({
    summary: 'Desactivar usuario a partir de su id.',
    description: 'Desactiva un usuario buscándolo por su id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario desactivado exitosamente.',
  })
  @Delete(':id')
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deactivate(id);
  }
}
