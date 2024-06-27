export interface CollectionRequest {
  description: string
  name: string
}

export interface CollectionsResponse {
  collections: CollectionResponse[]
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
