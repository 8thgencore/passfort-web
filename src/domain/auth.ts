import { ValueObject } from './common/valueObject'

export interface AuthProps {
  accessToken: string
  refreshToken: string
}

export class Auth extends ValueObject<AuthProps> {
  constructor(props: AuthProps) {
    super(props)
    if (!props.accessToken || !props.refreshToken) {
      throw new Error('Access token and refresh token must not be empty')
    }
  }

  get accessToken(): string {
    return this.props.accessToken
  }

  get refreshToken(): string {
    return this.props.refreshToken
  }
}
