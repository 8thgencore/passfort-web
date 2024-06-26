import { Collection, CollectionFactory } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'
import { ICollectionClient } from '@/services/collection/ICollectionClient'
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  CollectionResponse
} from '@/services/models/collectionModels'

export class CollectionRepository implements ICollectionRepository {
  constructor(private collectionClient: ICollectionClient) {}

  async createCollection(description: string, name: string): Promise<Collection> {
    const request: CreateCollectionRequest = { description, name }
    const response: CollectionResponse = await this.collectionClient.createCollection(request)
    return CollectionFactory.createFromDto(response)
  }

  async getCollections(): Promise<Collection[]> {
    const response: CollectionResponse[] = await this.collectionClient.getCollections()
    return response.map(CollectionFactory.createFromDto)
  }

  async getCollectionById(collectionId: string): Promise<Collection> {
    const response: CollectionResponse = await this.collectionClient.getCollectionById(collectionId)
    return CollectionFactory.createFromDto(response)
  }

  async updateCollection(
    collectionId: string,
    description: string,
    name: string
  ): Promise<Collection> {
    const request: UpdateCollectionRequest = { description, name }
    const response: CollectionResponse = await this.collectionClient.updateCollection(
      collectionId,
      request
    )
    return CollectionFactory.createFromDto(response)
  }

  async deleteCollection(collectionId: string): Promise<void> {
    await this.collectionClient.deleteCollection(collectionId)
  }
}
