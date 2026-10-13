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
import { Repository, FindOptionsWhere, Not } from 'typeorm';
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

    // Construimos las condiciones de búsqueda iniciales
    const whereConditions: any[] = [
      { name: cleanClient.name },
      { sap_id: cleanClient.sap_id },
      { microsip_id: cleanClient.microsip_id },
    ];

    if (cleanClient.gov_id && cleanClient.gov_id !== 'XAXX010101000') {
      whereConditions.push({ gov_id: cleanClient.gov_id });
    }

    const clientFound: Client | null = await this.clientsRepository.findOne({
      where: whereConditions,
    });

    if (clientFound) {
      if (clientFound.name === cleanClient.name) {
        throw new ConflictException('La Razón Social ya existe.');
      }
      if (clientFound.sap_id === cleanClient.sap_id) {
        throw new ConflictException('La clave SAP ya se encuentra registrada.');
      }
      if (clientFound.microsip_id === cleanClient.microsip_id) {
        throw new ConflictException(
          'La clave Microsip ya se encuentra registrada.',
        );
      }
      if (
        cleanClient.gov_id !== 'XAXX010101000' &&
        clientFound.gov_id === cleanClient.gov_id
      ) {
        throw new ConflictException('El RFC ya se encuentra registrado.');
      }
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
  async findAll(isActive?: boolean, seller?: string) {
    const whereCondition: FindOptionsWhere<Client> = {};

    if (isActive !== undefined) {
      whereCondition.status = isActive;
    }

    if (seller) {
      whereCondition.seller = seller; // Filtra por cadenas como "VENTAS_1", "VENTAS_2", etc.
    }

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
  async findOne(id: string) {
    const client: Client | null = await this.clientsRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado`);
    }

    return {
      message: 'Usuario obtenido exitosamente.',
      client: client,
    };
  }

  //---------------------------------------//
  async update(id: string, clientToUpdate: UpdateClientDto) {
    const clientExists = await this.clientsRepository.findOne({
      where: { id },
    });
    if (!clientExists) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado`);
    }

    const cleanClient = sanitizeObject(clientToUpdate);

    // Condiciones para buscar si OTRO registro ya tiene estos datos
    const conflictingConditions: any[] = [];

    if (cleanClient.name) {
      conflictingConditions.push({ name: cleanClient.name, id: Not(id) });
    }
    if (cleanClient.sap_id) {
      conflictingConditions.push({ sap_id: cleanClient.sap_id, id: Not(id) });
    }
    if (cleanClient.microsip_id) {
      conflictingConditions.push({
        microsip_id: cleanClient.microsip_id,
        id: Not(id),
      });
    }
    if (cleanClient.gov_id && cleanClient.gov_id !== 'XAXX010101000') {
      conflictingConditions.push({
        gov_id: cleanClient.gov_id,
        id: Not(id),
      });
    }

    // Si hay campos a validar, buscamos coincidencias en otros registros
    if (conflictingConditions.length > 0) {
      const existingClient = await this.clientsRepository.findOne({
        where: conflictingConditions,
      });

      if (existingClient) {
        if (cleanClient.name && existingClient.name === cleanClient.name) {
          throw new ConflictException('La Razón Social ya existe.');
        }
        if (
          cleanClient.sap_id &&
          existingClient.sap_id === cleanClient.sap_id
        ) {
          throw new ConflictException(
            'La clave SAP ya se encuentra registrada.',
          );
        }
        if (
          cleanClient.microsip_id &&
          existingClient.microsip_id === cleanClient.microsip_id
        ) {
          throw new ConflictException(
            'La clave Microsip ya se encuentra registrada.',
          );
        }
        if (
          cleanClient.gov_id &&
          cleanClient.gov_id !== 'XAXX010101000' &&
          existingClient.gov_id === cleanClient.gov_id
        ) {
          throw new ConflictException('El RFC ya se encuentra registrado.');
        }
      }
    }

    Object.assign(clientExists, cleanClient);

    const updatedClient = await this.clientsRepository.save(clientExists);

    return {
      message: 'Usuario actualizado exitosamente.',
      client: updatedClient,
    };
  }

  //---------------------------------------//
  async remove(id: string) {
    const status = false;

    const client: Client | undefined = await this.clientsRepository.preload({
      id,
      status,
    });

    if (!client) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado`);
    }

    const deactivatedClient = await this.clientsRepository.save(client);

    return {
      message: 'Cliente desactivado exitosamente.',
      client,
    };
  }
}
