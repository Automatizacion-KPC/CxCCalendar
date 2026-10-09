//-------------------------------------------------//
//---------------------Librerias-------------------//
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//-------------------------------------------------//
//-------------------------------------------------//
@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
    unique: true,
  })
  gov_id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 7,
    unique: true,
  })
  sap_id: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  microsip_id: string;

  @Column({
    type: 'varchar',
    length: 2,
  })
  management_status: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  management_description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;
}
