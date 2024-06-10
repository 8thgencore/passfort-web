export class EntityId {
  constructor(private readonly id: string) {
    if (!id) {
      throw new Error('EntityId must not be empty')
    }
  }

  toString(): string {
    return this.id
  }
}
