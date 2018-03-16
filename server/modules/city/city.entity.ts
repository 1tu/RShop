import { Column, Entity } from 'typeorm';

import { AEntityBase } from '../../common/entity/base.entity';

@Entity('city')
export class CityEntity extends AEntityBase {
  @Column({ length: 50 })
  nameEng: string;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 80 })
  nameGenitive: string;

  @Column({ length: 80 })
  nameDative: string;

  @Column({ length: 80 })
  nameAccusative: string;

  @Column({ length: 80 })
  nameInstrumental: string;

  @Column({ length: 80 })
  namePrepositional: string;

  @Column('int')
  population: number;
}
