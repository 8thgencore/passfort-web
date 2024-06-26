export interface CreateCollectionRequest {
  description: string
  name: string
}

export interface UpdateCollectionRequest {
  description: string
  name: string
}

export interface CollectionResponse {
  id: string
  description: string
  name: string
  created_by: string
  updated_by: string
  created_at: Date
  updated_at: Date
}
