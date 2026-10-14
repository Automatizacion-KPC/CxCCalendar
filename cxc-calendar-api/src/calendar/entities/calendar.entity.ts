//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ManagementStatusCatalog } from '../../management-status-catalog/entities/management-status-catalog.entity.js';
import { Client } from '../../clients/entities/client.entity.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Entity({ name: 'calendar' })
export class Calendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.calendars, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @Column({
    type: 'date',
    nullable: false,
  })
  visit_date: Date;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  agreement: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  next_visit: Date;

  @ManyToOne(() => ManagementStatusCatalog, (status) => status.calendars, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_management_status' })
  status: ManagementStatusCatalog;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
