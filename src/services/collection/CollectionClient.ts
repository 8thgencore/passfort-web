import { HttpClient } from '@/services/http/HttpClient'
import { ICollectionClient } from './ICollectionClient'
import {
  CollectionRequest,
  CollectionResponse,
  CollectionsResponse
} from '@/services/models/collectionModels'
import { PaginationOptions } from '../models/baseModels'
import { Response } from '@/services/models/baseModels'

export class CollectionClient implements ICollectionClient {
  constructor(private httpClient: HttpClient) {}

  async createCollection(data: CollectionRequest): Promise<CollectionResponse> {
    const response = await this.httpClient.post<Response<CollectionResponse>>('/collections', data)
    return response.data
  }

  async getCollections(data: PaginationOptions): Promise<CollectionResponse[]> {
    const params = new URLSearchParams()
    params.append('limit', data.limit.toString())
    params.append('skip', data.skip.toString())

    const response = await this.httpClient.get<Response<CollectionsResponse>>(
      `/collections/me?${params.toString()}`
    )
    return response.data.collections
  }

  async getCollectionById(collectionId: string): Promise<CollectionResponse> {
    const response = await this.httpClient.get<Response<CollectionResponse>>(
      `/collections/${collectionId}`
    )
    return response.data
  }

  async updateCollection(
    collectionId: string,
    data: CollectionRequest
  ): Promise<CollectionResponse> {
    const response = await this.httpClient.put<Response<CollectionResponse>>(
      `/collections/${collectionId}`,
      data
    )
    return response.data
  }

  async deleteCollection(collectionId: string): Promise<void> {
    await this.httpClient.delete(`/collections/${collectionId}`)
  }
}
