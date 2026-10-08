//-------------------------------------------------//
//---------------------Librerias-------------------//
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

//-------------------------------------------------//
//--------------------Entities---------------------//


//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  password_hash: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  is_admin: boolean;

}
