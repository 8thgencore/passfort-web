export interface Secret {
  id: string
  name: string
  description: string
  collection_id: string
  secret_type: 'password' | 'text'
  password_secret?: {
    login: string
    password: string
    url: string
  }
  text_secret?: {
    text: string
  }
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
}
