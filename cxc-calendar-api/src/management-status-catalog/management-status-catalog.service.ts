//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//-------------------------------------------------//
//----------------------DTOs-----------------------//
import { ManagementStatusCatalog } from './entities/management-status-catalog.entity.js';
//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository } from 'typeorm';
import { CreateManagementStatusCatalogDto } from './dto/create-management-status-catalog.dto.js';

import { sanitizeObject } from '../helpers/string.helper.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class ManagementStatusCatalogService {
  constructor(
    @InjectRepository(ManagementStatusCatalog)
    private readonly management_status_catalog: Repository<ManagementStatusCatalog>,
  ) {}

  //---------------------------------------//
  async findAll() {
    const management_status: ManagementStatusCatalog[] =
      await this.management_status_catalog.find();

    if (!management_status || management_status.length === 0) {
      throw new NotFoundException(
        'No se encontraron estados de gestión en el catálogo.',
      );
    }
    return {
      message: 'Lista de estados de gestión obtenida exitosamente.',
      management_status,
    };
  }
  //---------------------------------------//
  async findOne(id: string) {
    const status: ManagementStatusCatalog | null =
      await this.management_status_catalog.findOne({
        where: { id },
      });

    if (!status) {
      throw new NotFoundException(
        `Estato de gestión con id: ${id} no encontrado`,
      );
    }

    return {
      message: 'Estado de gestión obtenido exitosamente.',
      management_status: status,
    };
  }
}
