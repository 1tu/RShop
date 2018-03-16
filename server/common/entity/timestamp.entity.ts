import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AEntityBase } from '.';

export abstract class AEntityTimestamp extends AEntityBase {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

