//-------------------------------------------------//
//--------------------Librerias--------------------//
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//-------------------------------------------------//
//-----------------Servicios y Dto's---------------//
import { CalendarService } from './calendar.service.js';
import { CreateCalendarDto } from './dto/create-calendar.dto.js';
import { UpdateCalendarDto } from './dto/update-calendar.dto.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  //---------------------------------------//
  @ApiOperation({
    summary: 'Crear nuevo registro de visita.',
    description: 'Registra la visita de un cliente por el departamento de cxc.',
  })
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @Post()
  create(@Body() visit_to_register: CreateCalendarDto) {
    return this.calendarService.create(visit_to_register);
  }

  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id);
  }
}
