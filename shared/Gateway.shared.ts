import { EntityType, EntityActionType } from './Entity.shared';

export function makeEvent(e: EntityType, a: EntityActionType): string {
  return e + a;
}
