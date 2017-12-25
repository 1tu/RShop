import { Entity, Column } from 'typeorm';
import { AEntityBase } from '../../common/entity';

@Entity('permission')
export class PermissionEntity extends AEntityBase {
  @Column({ length: 100, unique: true, nullable: false })
  name: string;
}
