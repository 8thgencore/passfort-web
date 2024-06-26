import { BaseEntity } from './common/baseEntity'
import { EntityId } from './common/entityId'
import { CollectionResponse } from '@/services/models/collectionModels'

export class Collection extends BaseEntity {
  constructor(
    id: EntityId,
    public readonly name: string,
    public readonly description: string,
    public readonly created_by: string,
    public readonly updated_by: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id)

    if (!name || !description) {
      throw new Error('Name and description must not be empty')
    }
  }
}

export class CollectionFactory {
  static createFromDto(dto: CollectionResponse): Collection {
    return new Collection(
      new EntityId(dto.id),
      dto.name,
      dto.description,
      dto.created_by,
      dto.updated_by,
      new Date(dto.created_at),
      new Date(dto.updated_at)
    )
  }
}
