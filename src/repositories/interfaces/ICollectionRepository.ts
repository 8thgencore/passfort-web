// repositories/interfaces/ICollectionRepository.ts
import { Collection } from '@/domain/collection'
import { PaginationOptions } from '@/services/models/baseModels'

export interface ICollectionRepository {
  createCollection(name: string, description: string): Promise<Collection>
  getCollections(data: PaginationOptions): Promise<Collection[]>
  getCollectionById(collectionId: string): Promise<Collection>
  updateCollection(collectionId: string, name: string, description: string): Promise<Collection>
  deleteCollection(collectionId: string): Promise<void>
}
