import { v4 as uuidv4 } from 'uuid'

export class EntityId {
  constructor(private readonly id: string) {
    if (!id) {
      throw new Error('EntityId must not be empty')
    }

    if (!this.isValidUuid(id)) {
      throw new Error('EntityId must be a valid UUID')
    }
  }

  get value(): string {
    return this.id
  }

  toString(): string {
    return this.id
  }

  equals(other: EntityId): boolean {
    return this.id === other.id
  }

  private isValidUuid(id: string): boolean {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return uuidPattern.test(id)
  }

  static generate(): EntityId {
    return new EntityId(uuidv4())
  }
}
