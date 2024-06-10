import { EntityId } from './entityId'

export abstract class BaseEntity {
  constructor(public readonly id: EntityId) {}
}
