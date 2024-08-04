import { PasswordResponse, SecretResponse, TextResponse } from '@/services/models/secretModels'

export class Secret {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public collectionId: string,
    public secretType: SecretType.PASSWORD | SecretType.TEXT,
    public readonly createdAt: Date,
    public readonly createdBy: string,
    public readonly updatedAt: Date,
    public readonly updatedBy: string,
    public passwordSecret?: {
      login: string
      password: string
      url: string
    },
    public textSecret?: {
      text: string
    },
    public show?: boolean
  ) {
    if (!name || !description) {
      throw new Error('Name and description must not be empty')
    }
  }
}

export class SecretFactory {
  static createFromDto(dto: SecretResponse): Secret {
    const passwordSecret = dto.password_secret
      ? PasswordSecretFactory.createFromDto(dto.password_secret)
      : undefined
    const textSecret = dto.text_secret
      ? TextSecretFactory.createFromDto(dto.text_secret)
      : undefined

    return new Secret(
      dto.id,
      dto.name,
      dto.description,
      dto.collection_id,
      dto.secret_type as SecretType.PASSWORD | SecretType.TEXT,
      new Date(dto.created_at),
      dto.created_by,
      new Date(dto.updated_at),
      dto.updated_by,
      passwordSecret,
      textSecret
    )
  }
}

export class TextSecretFactory {
  static createFromDto(dto: TextResponse): { text: string } {
    return { text: dto.text }
  }
}

export class PasswordSecretFactory {
  static createFromDto(dto: PasswordResponse): { login: string; password: string; url: string } {
    return { login: dto.login, password: dto.password, url: dto.url }
  }
}
