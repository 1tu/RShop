import { Column } from 'typeorm';

export class EmbedCases {
  @Column({ length: 80 })
  nominative: string;

  @Column({ length: 80 })
  genitive: string;

  @Column({ length: 80 })
  dative: string;

  @Column({ length: 80 })
  accusative: string;

  @Column({ length: 80 })
  instrumental: string;

  @Column({ length: 80 })
  prepositional: string;
}
