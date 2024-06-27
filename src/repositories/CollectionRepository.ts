import { Collection, CollectionFactory } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'
import { ICollectionClient } from '@/services/collection/ICollectionClient'
import { PaginationOptions } from '@/services/models/baseModels'
import { CollectionRequest, CollectionResponse } from '@/services/models/collectionModels'

export class CollectionRepository implements ICollectionRepository {
  constructor(private collectionClient: ICollectionClient) {}

  async createCollection(name: string, description: string): Promise<Collection> {
    const request: CollectionRequest = { name, description }
    const response: CollectionResponse = await this.collectionClient.createCollection(request)
    return CollectionFactory.createFromDto(response)
  }

  async getCollections(data: PaginationOptions): Promise<Collection[]> {
    const response: CollectionResponse[] = await this.collectionClient.getCollections({
      limit: data.limit,
      skip: data.skip
    })
    if (response != null) {
      return response.map(CollectionFactory.createFromDto)
    } else {
      return []
    }
  }

  async getCollectionById(collectionId: string): Promise<Collection> {
    const response: CollectionResponse = await this.collectionClient.getCollectionById(collectionId)
    return CollectionFactory.createFromDto(response)
  }

  async updateCollection(
    collectionId: string,
    name: string,
    description: string
  ): Promise<Collection> {
    const request: CollectionRequest = { name, description }
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
