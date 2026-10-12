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
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

//-------------------------------------------------//
//-------------Entities y Repositories-------------//
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity.js';

import { sanitizeObject } from '../helpers/string.helper.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  //---------------------------------------//
  async create(newClient: CreateClientDto) {
    // Limpia todas las propiedades tipo string del DTO a mayúsculas, sin acentos ni especiales
    const cleanClient = sanitizeObject(newClient);

    //Verificacion de la razón Social
    const clientFound: Client | null = await this.clientsRepository.findOne({
      where: { name: cleanClient.name },
    });
    if (clientFound) {
      throw new ConflictException('La razón Social ya existe.');
    }

    //Creacion y guardado del cliente
    const clientCreated: Client = this.clientsRepository.create(cleanClient);
    if (!cleanClient) {
      throw new BadRequestException('No se pudo registrar al cliente.');
    }
    const completeClient: Client =
      await this.clientsRepository.save(clientCreated);

    return {
      message: 'Registro exitoso.',
      client: completeClient,
    };
  }

  //---------------------------------------//
  async findAll(isActive?: boolean) {
    const whereCondition = isActive !== undefined ? { status: isActive } : {};

    const clients: Client[] = await this.clientsRepository.find({
      where: whereCondition,
    });
    if (!clients || clients.length === 0) {
      throw new NotFoundException('No se encontraron clientes.');
    }

    return {
      message: 'Lista de clientes obtenida exitosamente.',
      clients: clients,
    };
  }

  //---------------------------------------//
  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
