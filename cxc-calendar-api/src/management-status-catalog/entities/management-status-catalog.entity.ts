//-------------------------------------------------//
//---------------------Librerias-------------------//
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import type { Calendar } from '../../calendar/entities/calendar.entity.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Entity({ name: 'management_status_catalog' })
export class ManagementStatusCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: false,
    unique: true,
  })
  abbreviation: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  description: string;

@OneToMany('Calendar', (calendar: Calendar) => calendar.status)
  calendars: Calendar[];
}
