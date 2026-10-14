//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//-------------------------------------------------//
//----------------------DTOs-----------------------//
import { CreateCalendarDto } from './dto/create-calendar.dto.js';
import { UpdateCalendarDto } from './dto/update-calendar.dto.js';

//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository, DataSource } from 'typeorm';
import { Calendar } from './entities/calendar.entity.js';
import { Client } from '../clients/entities/client.entity.js';
import { ManagementStatusCatalog } from '../management-status-catalog/entities/management-status-catalog.entity.js';

import { sanitizeObject } from '../helpers/string.helper.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(ManagementStatusCatalog)
    private readonly management_status_catalog: Repository<ManagementStatusCatalog>,
    private readonly dataSource: DataSource,
  ) {}

  //---------------------------------------//
  async create(visit_to_register: CreateCalendarDto) {
    const client: Client | null = await this.clientsRepository.findOne({
      where: { id: visit_to_register.id_client },
    });
    if (!client) {
      throw new NotFoundException('El id del cliente no es válido.');
    }

    const status: ManagementStatusCatalog | null =
      await this.management_status_catalog.findOne({
        where: { id: visit_to_register.id_management_status },
      });

    if (!status) {
      throw new NotFoundException('El id del estado de gestión no es válido.');
    }

    // --- Validación de fechas en el servicio ---
    const visitDate = new Date(visit_to_register.visit_date);
    const nextVisit = new Date(visit_to_register.next_visit);
    const now = new Date();

    if (nextVisit <= visitDate) {
      throw new BadRequestException(
        `La próxima fecha de visita (${nextVisit}) debe ser mayor que la fecha de visita (${visitDate}).`,
      );
    }
    if (nextVisit <= now) {
      throw new BadRequestException(
        `La próxima fecha de visita (${nextVisit}) debe ser mayor que la fecha actual de registro.`,
      );
    }

    const cleanVisit = sanitizeObject(visit_to_register);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const client_status: string = status.abbreviation;
      client.management_status = client_status;

      // Transacción para el cliente
      const updatedClient = await queryRunner.manager.save(client);

      if (updatedClient.management_status !== client_status) {
        throw new InternalServerErrorException(
          'No se pudo actualizar el estado de gestión del cliente.',
        );
      }

      const visitCreated: Calendar = queryRunner.manager.create(Calendar, {
        client,
        visit_date: visitDate,
        agreement: cleanVisit.agreement,
        next_visit: nextVisit,
        status,
      });

      // Transacción para el calendario
      const visit_registered = await queryRunner.manager.save(visitCreated);

      // Si todo sale bien, confirmamos los cambios
      await queryRunner.commitTransaction();

      return {
        message: 'Registro exitoso.',
        visit: visit_registered,
      };
    } catch (error) {
      // Si ocurre cualquier error, revertimos todo lo que se hizo en la BD
      await queryRunner.rollbackTransaction();

      // Si ya es una excepción http de NestJS, la relanzamos; si no, lanzamos un InternalServerError
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al procesar el registro de la visita.',
      );
    } finally {
      // Liberar el queryRunner al terminar
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all calendar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calendar`;
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return `This action updates a #${id} calendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`;
  }
}
