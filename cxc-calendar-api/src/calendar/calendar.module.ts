//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//------------Controladores y Proveedores----------//
import { CalendarService } from './calendar.service.js';
import { CalendarController } from './calendar.controller.js';

//-------------------------------------------------//
//--------------------Entities---------------------//
import { Calendar } from './entities/calendar.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
