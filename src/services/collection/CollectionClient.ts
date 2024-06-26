import { HttpClient } from '@/services/http/HttpClient'
import { ICollectionClient } from './ICollectionClient'
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  CollectionResponse
} from '@/services/models/collectionModels'

export class CollectionClient implements ICollectionClient {
  constructor(private httpClient: HttpClient) {}

  async createCollection(data: CreateCollectionRequest): Promise<CollectionResponse> {
    const response = await this.httpClient.post<CollectionResponse>('/collections', data)
    return response
  }

  async getCollections(): Promise<CollectionResponse[]> {
    const response = await this.httpClient.get<CollectionResponse[]>('/collections/me')
    return response
  }

  async getCollectionById(collectionId: string): Promise<CollectionResponse> {
    const response = await this.httpClient.get<CollectionResponse>(`/collections/${collectionId}`)
    return response
  }

  async updateCollection(
    collectionId: string,
    data: UpdateCollectionRequest
  ): Promise<CollectionResponse> {
    const response = await this.httpClient.put<CollectionResponse>(
      `/collections/${collectionId}`,
      data
    )
    return response
  }

  async deleteCollection(collectionId: string): Promise<void> {
    await this.httpClient.delete(`/collections/${collectionId}`)
  }
}
