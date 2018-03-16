import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { PermissionEntity } from '../permission/permission.entity';

@Entity('role')
export class RoleEntity extends AEntityBase {
  @Column({ length: 40, unique: true, nullable: false })
  name: string;

  @ManyToMany(type => PermissionEntity, { eager: true })
  @JoinTable()
  permissionList: PermissionEntity[];
}
