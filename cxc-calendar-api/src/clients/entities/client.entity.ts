//-------------------------------------------------//
//---------------------Librerias-------------------//
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

//-------------------------------------------------//
//-------------------------------------------------//
@Entity({ name: 'clients' })
@Index('idx_gov_id',['gov_id'],{
  unique: true,
  where: `"gov_id" <> 'XAXX010101000'`
})
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'gov_id',
    type: 'varchar',
    length: 15,
    nullable: false,
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
    length: 6,
    unique: true,
  })
  sap_id: string;

  @Column({
    type: 'varchar',
    length: 8,
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
    length: 8,
  })
  seller: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;
}
