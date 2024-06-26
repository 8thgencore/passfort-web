import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  CollectionResponse
} from '@/services/models/collectionModels'

export interface ICollectionClient {
  createCollection(data: CreateCollectionRequest): Promise<CollectionResponse>
  getCollections(): Promise<CollectionResponse[]>
  getCollectionById(collectionId: string): Promise<CollectionResponse>
  updateCollection(collectionId: string, data: UpdateCollectionRequest): Promise<CollectionResponse>
  deleteCollection(collectionId: string): Promise<void>
}
