import { CollectionRequest, CollectionResponse } from '@/services/models/collectionModels'
import { PaginationOptions } from '../models/baseModels'

export interface ICollectionClient {
  createCollection(data: CollectionRequest): Promise<CollectionResponse>
  getCollections(data: PaginationOptions): Promise<CollectionResponse[]>
  getCollectionById(collectionId: string): Promise<CollectionResponse>
  updateCollection(collectionId: string, data: CollectionRequest): Promise<CollectionResponse>
  deleteCollection(collectionId: string): Promise<void>
}
