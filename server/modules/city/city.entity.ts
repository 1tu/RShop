import { Entity, Column } from 'typeorm';
import { EmbedCases } from '../../common/embed/cases.embed';
import { AEntityBase } from '../../common/entity/base.entity';

@Entity('city')
export class CityEntity extends AEntityBase {
  @Column({ length: 50 })
  nameEng: string;

  @Column(type => EmbedCases)
  name: EmbedCases;
}
