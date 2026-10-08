//-------------------------------------------------//
//---------------------Librerias-------------------//
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    length: 200,
    nullable: false,
  })
  password_hashed: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  department: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  is_admin: boolean;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  is_active: boolean;
}
