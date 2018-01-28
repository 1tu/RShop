import { EntityType, EntityActionType } from '../Entity.shared';

export class Notify {
  public entity: EntityType;
  public type: EntityActionType;
  public message: string;
}
