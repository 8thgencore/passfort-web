// repositories/interfaces/ICollectionRepository.ts
import { Collection } from '@/domain/collection'

export interface ICollectionRepository {
  createCollection(description: string, name: string): Promise<Collection>
  getCollections(): Promise<Collection[]>
  getCollectionById(collectionId: string): Promise<Collection>
  updateCollection(collectionId: string, description: string, name: string): Promise<Collection>
  deleteCollection(collectionId: string): Promise<void>
}
