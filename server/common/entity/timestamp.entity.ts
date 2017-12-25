import {
  Column, EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { AEntityBase } from './index';

export abstract class AEntityTimestamp extends AEntityBase {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

